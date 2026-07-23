export const partnerHubBenefits = [
  {
    number: "01",
    title: "Submit your application",
    description:
      "Provide your event information, proposal link, publication request, and contact details in one place.",
  },
  {
    number: "02",
    title: "Receive review feedback",
    description:
      "View HIMTI's decision and admin notes, then revise your application when requested.",
  },
  {
    number: "03",
    title: "Complete the partnership",
    description:
      "Track agreed obligations and provide evidence links after your application is approved.",
  },
] as const;

export const applicationSteps = [
  {
    number: "01",
    title: "Create an account",
    description: "Register your organization and primary contact person.",
  },
  {
    number: "02",
    title: "Submit your application",
    description:
      "Share your event details, publication request, and proposal link.",
  },
  {
    number: "03",
    title: "Review and revision",
    description:
      "HIMTI reviews the application and may request changes before deciding.",
  },
  {
    number: "04",
    title: "Complete the partnership",
    description:
      "Fulfil the agreed deliverables and provide the required evidence links.",
  },
] as const;

export const preparationGroups = [
  {
    label: "Event information",
    items: [
      "Event name, organizer, and description",
      "Event date and location or platform",
      "Expected number of participants",
    ],
  },
  {
    label: "Organization and contact",
    items: [
      "Proposal URL",
      "Organization Instagram account",
      "Person in charge and WhatsApp number",
    ],
  },
  {
    label: "Publication request",
    items: [
      "Requested publication channels",
      "Publication requirements",
      "Publication deadline",
    ],
  },
] as const;
