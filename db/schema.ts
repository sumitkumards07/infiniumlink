import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// Users (Clerk Sync)
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk User ID
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Profiles (Top-level user configuration & username reservation)
export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    username: text("username").notNull().unique(), // The public handle
    verified: boolean("verified").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("profile_username_idx").on(table.username)]
);

// Pages (A user can have multiple pages eventually)
export const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("My Page"),
  slug: text("slug").notNull().default(""), // Empty for default root page
  isPublished: boolean("is_published").default(false).notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  ogImage: text("og_image"),
  // Global appearance settings stored as JSON
  appearanceJson: jsonb("appearance_json").default({}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blocks (The core of the visual editor)
// This represents the DRAFT state that the editor actively manipulates
export const blocks = pgTable(
  "blocks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // profile, link, text, image, video, social, gallery...
    position: integer("position").notNull(),
    parentId: uuid("parent_id"), // For nesting blocks (e.g., inside a layout grid)
    contentJson: jsonb("content_json").default({}).notNull(),
    styleJson: jsonb("style_json").default({}).notNull(),
    layoutJson: jsonb("layout_json").default({}).notNull(),
    animationJson: jsonb("animation_json").default({}).notNull(),
    visibilityJson: jsonb("visibility_json").default({}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("blocks_page_id_idx").on(table.pageId),
    index("blocks_position_idx").on(table.position),
  ]
);

// Page Versions (Snapshot for "Published" state)
export const pageVersions = pgTable(
  "page_versions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    name: text("name").default("Auto-save").notNull(),
    isPublishedVersion: boolean("is_published_version").default(false).notNull(),
    pageDataJson: jsonb("page_data_json").notNull(), // Complete snapshot of page + all blocks
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("page_versions_page_id_idx").on(table.pageId)]
);

// We drop the old 'links' and 'social_links' since they are now generic blocks.

// Analytics: Profile Views
export const profileViews = pgTable(
  "profile_views",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    referrer: text("referrer"),
    device: text("device"),
    browser: text("browser"),
    country: text("country"),
    ipHash: text("ip_hash"), 
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
);

// Analytics: Block Clicks (Replacing Link Clicks)
export const blockClicks = pgTable(
  "block_clicks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    blockId: text("block_id").notNull(), // We use text because in a snapshot the ID might just be a string in JSON
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    referrer: text("referrer"),
    device: text("device"),
    browser: text("browser"),
    country: text("country"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("block_clicks_block_id_idx").on(table.blockId),
  ]
);

// Keep Subscriptions, Domains, Leads, Products
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull(),
    planId: text("plan_id").notNull(), // free, pro, business
    status: text("status").notNull(),
    currentPeriodEnd: timestamp("current_period_end").notNull(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export const domains = pgTable(
  "domains",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    hostname: text("hostname").notNull().unique(), 
    verified: boolean("verified").default(false).notNull(),
    verificationToken: text("verification_token"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    pageId: uuid("page_id"), // Context where lead was collected
    blockId: text("block_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  currency: text("currency").default("usd").notNull(),
  imageUrl: text("image_url"),
  fileUrl: text("file_url"),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
