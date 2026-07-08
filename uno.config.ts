import type { Preset } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { themeConfig } from './src/config.ts'

const { light, dark } = themeConfig.color

/**
 * Design System - UnoCSS Configuration
 * 
 * Architecture:
 * 1. Semantic color tokens (primary, secondary, surface, border)
 * 2. Modular typography scale (1.2 ratio, anchored at 18px)
 * 3. Font families: Romana (titles) + Sans-serif (body)
 * 4. Accessibility-first: WCAG AA+ contrast, semantic HTML
 */
export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetTheme({
      theme: {
        dark: {
          colors: {
            ...dark,
            // Semantic tokens for message types
            note: 'oklch(70.7% 0.165 254.624 / 0.8)',
            tip: 'oklch(76.5% 0.177 163.223 / 0.8)',
            important: 'oklch(71.4% 0.203 305.504 / 0.8)',
            warning: 'oklch(82.8% 0.189 84.429 / 0.8)',
            caution: 'oklch(70.4% 0.191 22.216 / 0.8)',
          },
        },
      },
    }) as Preset<object>,
  ],
  theme: {
    /**
     * Color Palette
     * Semantic tokens mapped from themeConfig:
     * - primary: Identity color (headings, accents)
     * - secondary: Secondary text (body, descriptions)
     * - background: Canvas color
     * - highlight: Interaction states
     */
    colors: {
      ...light,
      note: 'oklch(48.8% 0.243 264.376 / 0.8)',
      tip: 'oklch(50.8% 0.118 165.612 / 0.8)',
      important: 'oklch(49.6% 0.265 301.924 / 0.8)',
      warning: 'oklch(55.5% 0.163 48.998 / 0.8)',
      caution: 'oklch(50.5% 0.213 27.518 / 0.8)',
    },
    /**
     * Typography System
     * sans: Body text, UI (Inter)
     * title: Headings (STIX - Romana style for elegance)
     * serif: Alternative serif for emphasis
     */
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      title: ['STIX', 'EarlySummer-Subset', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      navbar: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      time: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      serif: ['STIX', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
    /**
     * Spacing & Layout
     * Uses Tailwind's default spacing scale (4px base)
     * Supports responsive breakpoints: sm, md, lg, xl, 2xl
     */
  },
  /**
   * Custom Rules
   * Utility classes for repeated patterns
   */
  rules: [
    ['scrollbar-hidden', {
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
    }],
    /**
     * Focus Ring Utilities
     * Ensures keyboard navigation is accessible
     */
    ['focus-ring', {
      'outline': '2px solid var(--un-preset-theme-colors-primary)',
      'outline-offset': '2px',
    }],
  ],
  /**
   * Shortcuts: Semantic component classes
   * Promotes consistency and reduces repetition
   */
  shortcuts: {
    // Layout patterns
    'uno-desktop-column': 'fixed right-[max(5rem,calc(50vw-35rem))] w-14rem',
    'uno-decorative-line': 'mb-4.5 h-px w-full bg-secondary/15 lg:mb-6',
    
    // Design system tokens
    'uno-round-border': 'border border-secondary/12 rounded-sm border-solid',
    'uno-surface': 'bg-secondary/5 rounded-sm',
    
    // Typography - Article structure
    'prose-title': 'font-title font-620 text-4xl leading-tight text-primary',
    'prose-heading-1': 'font-title font-620 text-3xl leading-tight text-primary',
    'prose-heading-2': 'font-title font-620 text-2xl leading-tight text-primary',
    'prose-heading-3': 'font-title font-620 text-xl leading-tight text-primary',
    
    // Focus states - accessibility
    'focus-visible-ring': 'focus:(outline-2 outline-offset-2 outline-primary)',
  },
  /**
   * Variants: Custom responsive/state modifiers
   */
  variants: [
    // CJK (Chinese, Japanese, Korean) text rendering optimization
    (matcher) => {
      if (!matcher.startsWith('cjk:')) {
        return matcher
      }
      return {
        matcher: matcher.slice(4),
        selector: s => `${s}:is(:lang(zh), :lang(ja), :lang(ko))`,
      }
    },
    // Reduce motion for accessibility
    (matcher) => {
      if (!matcher.startsWith('motion:')) {
        return matcher
      }
      return {
        matcher: matcher.slice(7),
        selector: s => `${s}:is(@media (prefers-reduced-motion: reduce))`,
      }
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
