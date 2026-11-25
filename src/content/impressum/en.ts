import type { ImpressumContent } from "./types";

export const impressumEN: ImpressumContent = {
  title: "Imprint",
  sections: {
    provider: {
      heading: "Information according to § 5 TMG",
      name: "Dr. Joy A. Alemazung",
      address: [
        "Bürgermeisteramt Heubach",
        "Hauptstraße 11",
        "73540 Heubach",
      ],
    },
    contact: {
      heading: "Contact",
      emailLabel: "Email:",
    },
    responsible: {
      heading: "Responsible for content according to § 55 Abs. 2 RStV",
      address: [
        "Dr. Joy A. Alemazung",
        "Bürgermeisteramt Heubach",
        "Hauptstraße 11",
        "73540 Heubach",
      ],
    },
    contentLiability: {
      heading: "Liability for Content",
      paragraphs: [
        "As a service provider, we are responsible for our own content on these pages according to § 7 Abs.1 TMG under general laws. According to §§ 8 to 10 TMG, however, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.",
        "Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such violations, we will remove this content immediately.",
      ],
    },
    linkLiability: {
      heading: "Liability for Links",
      paragraphs: [
        "Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking.",
        "A permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. Upon becoming aware of violations, we will remove such links immediately.",
      ],
    },
    copyright: {
      heading: "Copyright",
      paragraphs: [
        "The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.",
        "Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of violations, we will remove such content immediately.",
      ],
    },
    consumerDispute: {
      heading: "Consumer Dispute Resolution / Universal Arbitration Board",
      text: "We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.",
    },
  },
};
