/** Payload shapes returned by portfolio-service (/profile, /achievements). */

export interface PersonalInfo {
  fullname: string
  nickname: string
  title: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  instagram: string
  whatsApp: string
  website: string
  about_id: string
  about_en: string
  bio_id: string
  bio_en: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

export interface Skill {
  name: string
  category: 'mobile' | 'web' | 'backend' | 'tools'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Experience {
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
}

export interface Achievement {
  id: string
  title: string
  organizer: string
  date: string
  type: 'certificate' | 'certification' | 'webinar' | 'seminar' | 'contribution'
  certificate_number: string
  participant_as: string
  description: string
}

export interface Release {
  repo: string
  tag: string
  publishedAt: string
}

/**
 * The committed snapshot: what the build renders, and the fallback at runtime.
 *
 * It holds exactly what this site shows. The profile endpoint also returns the
 * education list, which the hub does not render (that lives at abuamar.online);
 * carrying it here would only make the file bigger and the type wider than any
 * consumer needs.
 */
export interface Snapshot {
  /** When the snapshot was taken: the only way to tell how old the fallback is. */
  fetchedAt: string
  personalInfo: PersonalInfo
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  achievements: Achievement[]
  releases: Release[]
}

/** What the island re-renders from the live API: the snapshot minus build-only fields. */
export type LiveData = Omit<Snapshot, 'fetchedAt' | 'releases'>
