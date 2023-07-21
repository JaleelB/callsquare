export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
    }
}

export const siteConfig: SiteConfig = {
  name: "Callsquare",
  description:
    "An open source video conferencing platform. Connect, collaborate, and communicate via video calls with ease.",
  url: "https://callsquare.jaleelbennett.com",
  ogImage: "https://callsquare.jaleelbennett.com/web-shot.png",
  links: {
    twitter: "https://twitter.com/jal_eelll",
    github: "https://github.com/JaleelB/callsquare",
  },
}