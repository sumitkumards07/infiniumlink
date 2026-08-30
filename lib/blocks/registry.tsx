import { BlockDef, BlockType } from "./types";
import { Link, AlignLeft, User, Share2, Video, Minus, Mail } from "lucide-react";

import { ProfileBlockRenderer, ProfileBlockEditor } from "./components/ProfileBlock";
import { LinkBlockRenderer, LinkBlockEditor } from "./components/LinkBlock";
import { TextBlockRenderer, TextBlockEditor } from "./components/TextBlock";
import { NewsletterBlockRenderer, NewsletterBlockEditor } from "./components/NewsletterBlock";
import { SocialBlockRenderer, SocialBlockEditor } from "./components/SocialBlock";
import { VideoBlockRenderer, VideoBlockEditor } from "./components/VideoBlock";
import { DividerBlockRenderer, DividerBlockEditor } from "./components/DividerBlock";

export const blockRegistry: Record<BlockType, BlockDef> = {
  profile: {
    type: "profile",
    label: "Profile",
    icon: User,
    defaultConfig: {
      contentJson: { name: "", bio: "", avatarUrl: "" },
      styleJson: { radius: "full", alignment: "center" },
    },
    render: ProfileBlockRenderer,
    editor: ProfileBlockEditor,
  },
  link: {
    type: "link",
    label: "Link",
    icon: Link,
    defaultConfig: {
      contentJson: { title: "New Link", url: "" },
      styleJson: { buttonStyle: "rounded", background: "#ffffff", color: "#000000" },
    },
    render: LinkBlockRenderer,
    editor: LinkBlockEditor,
  },
  text: {
    type: "text",
    label: "Text",
    icon: AlignLeft,
    defaultConfig: {
      contentJson: { html: "<p>Write something...</p>" },
      styleJson: { color: "#000000", alignment: "left" },
    },
    render: TextBlockRenderer,
    editor: TextBlockEditor,
  },
  social: {
    type: "social",
    label: "Social Icons",
    icon: Share2,
    defaultConfig: {
      contentJson: { links: [] },
      styleJson: { background: "#ffffff", color: "#1e2330" },
    },
    render: SocialBlockRenderer,
    editor: SocialBlockEditor,
  },
  video: {
    type: "video",
    label: "Video",
    icon: Video,
    defaultConfig: {
      contentJson: { url: "", caption: "" },
      styleJson: { radius: "24px" },
    },
    render: VideoBlockRenderer,
    editor: VideoBlockEditor,
  },
  divider: {
    type: "divider",
    label: "Divider",
    icon: Minus,
    defaultConfig: { styleJson: { thickness: 1, color: "#d8d6cf", style: "solid", width: "full" } },
    render: DividerBlockRenderer,
    editor: DividerBlockEditor,
  },
  newsletter: {
    type: "newsletter",
    label: "Newsletter",
    icon: Mail,
    defaultConfig: {
      contentJson: { heading: "Subscribe", description: "Get the latest updates", placeholder: "Email address", buttonText: "Subscribe" },
      styleJson: { background: "#f3f4f6", color: "#000000", radius: "12px" },
    },
    render: NewsletterBlockRenderer,
    editor: NewsletterBlockEditor,
  }
};
