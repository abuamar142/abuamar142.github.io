/**
 * The complete copy contract.
 *
 * Both locales implement it, and the renderers take it as a type rather than
 * reading loose strings — so a key added to one language and forgotten in the
 * other is a type error, not a page with a missing sentence.
 */

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type Category = 'mobile' | 'web' | 'backend' | 'tools'

export interface Copy {
  code: 'id' | 'en'
  siteTitle: string
  metaDescription: string
  skipToContent: string
  heroKicker: string
  heroTitle: string
  heroLead: string
  heroPrimary: string
  heroSecondary: string
  heroTertiary: string
  portraitAlt: string
  statYears: string
  statProjects: string
  statSkills: string
  statAchievements: string
  gatewayKicker: string
  gatewayTitle: string
  gatewayLead: string
  gatewayPortfolioTitle: string
  gatewayPortfolioDek: string
  gatewayPortfolioAction: string
  gatewayBlogTitle: string
  gatewayBlogDek: string
  gatewayBlogAction: string
  gatewayGithubTitle: string
  gatewayGithubDek: string
  gatewayGithubAction: string
  gatewayToolsTitle: string
  gatewayToolsDek: string
  gatewayToolsAction: string
  projectsKicker: string
  projectsTitle: string
  projectsLead: string
  projectsRepo: string
  projectsDemo: string
  projectsNoLink: string
  approachKicker: string
  approachTitle: string
  approachLead: string
  approachOneTitle: string
  approachOneBody: string
  approachTwoTitle: string
  approachTwoBody: string
  approachThreeTitle: string
  approachThreeBody: string
  contributionsKicker: string
  contributionsTitle: string
  contributionsLead: string
  contributionLabel: string
  skillsKicker: string
  skillsTitle: string
  skillsLead: string
  levelLabel: Record<Level, string>
  categoryLabel: Record<Category, string>
  techLabel: string
  contactKicker: string
  contactTitle: string
  contactLead: string
  contactEmail: string
  contactWhatsapp: string
  contactLocation: string
  footerNote: string
  footerPortfolio: string
  footerGithub: string
  footerLinkedin: string
  footerInstagram: string
  staleBanner: string
  retry: string
  themeToggle: string
  languageToggle: string
}
