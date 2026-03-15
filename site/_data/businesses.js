const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

function slugify(str) {
  return str.toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categorySlug(category) {
  const map = {
    auto_repair: "auto-repair",
    body_shop: "body-shops",
    tire_shop: "tire-shops",
    oil_change: "oil-change",
    towing: "towing",
    auto_parts: "auto-parts"
  };
  return map[category] || category;
}

function categoryLabel(category) {
  const map = {
    auto_repair: "Auto Repair",
    body_shop: "Body Shops",
    tire_shop: "Tire Shops",
    oil_change: "Oil Change",
    towing: "Towing",
    auto_parts: "Auto Parts"
  };
  return map[category] || category;
}

function categorySchemaType(category) {
  const map = {
    auto_repair: "AutoRepair",
    body_shop: "AutoBodyShop",
    tire_shop: "TireShop",
    oil_change: "AutoRepair",
    towing: "LocalBusiness",
    auto_parts: "AutoPartsStore"
  };
  return map[category] || "LocalBusiness";
}

module.exports = function() {
  const dataDir = path.join(__dirname, "../../data");

  // Read premium config
  const premiumConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "premium.json"), "utf8"));
  const premiumData = premiumConfig.businesses;

  // Read main business data
  const mainCsv = fs.readFileSync(path.join(dataDir, "auto-services-businesses.csv"), "utf8");
  const mainRecords = parse(mainCsv, { columns: true, skip_empty_lines: true, trim: true, relax_column_count: true });

  // Filter and clean
  const businesses = mainRecords
    .filter(b => {
      if (b.business_status && b.business_status !== "OPERATIONAL") return false;
      return true;
    })
    .map(b => {
      const slug = slugify(b.name);
      const catSlug = categorySlug(b.category);
      const url = `/${catSlug}/${slug}/`;
      const prem = premiumData[slug] || null;

      return {
        name: b.name,
        slug,
        category: b.category,
        categorySlug: catSlug,
        categoryLabel: categoryLabel(b.category),
        schemaType: categorySchemaType(b.category),
        address: b.address,
        city: b.city,
        citySlug: slugify(b.city),
        zip: b.zip,
        phone: b.phone,
        email: b.email,
        website: b.website,
        lat: b.lat,
        lng: b.lng,
        google_rating: b.google_rating ? parseFloat(b.google_rating) : null,
        google_review_count: b.google_review_count ? parseInt(b.google_review_count) : 0,
        google_maps_url: b.google_maps_url,
        url,

        // Website quality
        website_quality_score: b.website_quality_score || null,
        is_independent: b.is_independent === "Yes",

        // Premium status
        premium: !!prem,

        // Premium content fields
        premiumTagline: prem ? (prem.tagline || null) : null,
        premiumDescription: prem ? (prem.description || null) : null,
        premiumPhotos: prem ? (prem.photos || []) : [],
        premiumHours: prem ? (prem.hours || null) : null,
        premiumServices: prem ? (prem.services || null) : null,
        premiumTestimonials: prem ? (prem.testimonials || []) : [],
        premiumBadges: prem ? (prem.badges || []) : [],
        premiumDirector: prem ? (prem.director || null) : null,
        premiumSocial: prem ? (prem.social || null) : null,

        // Services list
        services: buildServices(b)
      };
    })
    .sort((a, b) => {
      if (a.premium && !b.premium) return -1;
      if (!a.premium && b.premium) return 1;
      return a.name.localeCompare(b.name);
    });

  // Group by category
  const byCategory = {};
  for (const b of businesses) {
    if (!byCategory[b.categorySlug]) {
      byCategory[b.categorySlug] = {
        slug: b.categorySlug,
        label: b.categoryLabel,
        items: []
      };
    }
    byCategory[b.categorySlug].items.push(b);
  }

  // Group by city
  const byCity = {};
  for (const b of businesses) {
    const city = b.city;
    if (!byCity[city]) {
      byCity[city] = {
        name: city,
        slug: b.citySlug,
        items: []
      };
    }
    byCity[city].items.push(b);
  }

  const cities = Object.values(byCity)
    .sort((a, b) => b.items.length - a.items.length);

  return {
    all: businesses,
    byCategory,
    byCity,
    cities,
    categories: Object.values(byCategory)
  };
};

function buildServices(business) {
  const services = [];
  const cat = business.category;

  if (cat === "auto_repair") {
    services.push("General Auto Repair");
    services.push("Diagnostics");
    services.push("Maintenance");
    if (business.notes && business.notes.toLowerCase().includes("transmission")) {
      services.push("Transmission Repair");
    }
    if (business.notes && business.notes.toLowerCase().includes("alignment")) {
      services.push("Alignment & Suspension");
    }
    if (business.notes && business.notes.toLowerCase().includes("inspection")) {
      services.push("PA State Inspection");
    }
  } else if (cat === "body_shop") {
    services.push("Collision Repair");
    services.push("Auto Body Repair");
    services.push("Painting");
    if (business.notes && business.notes.toLowerCase().includes("towing")) {
      services.push("Towing");
    }
  } else if (cat === "tire_shop") {
    services.push("Tire Sales & Installation");
    services.push("Tire Rotation");
    services.push("Wheel Alignment");
    services.push("Balancing");
  } else if (cat === "oil_change") {
    services.push("Oil Change");
    services.push("Fluid Services");
    services.push("Filter Replacement");
  } else if (cat === "towing") {
    services.push("24-Hour Towing");
    services.push("Roadside Assistance");
    services.push("Accident Recovery");
  } else if (cat === "auto_parts") {
    services.push("Auto Parts Sales");
    if (business.notes && business.notes.toLowerCase().includes("used")) {
      services.push("Used Parts");
      services.push("Salvage");
    }
  }

  return services;
}
