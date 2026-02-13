interface Translation {
  title: string
  subtitle: string
  description: string
  posts: string
  tags: string
  about: string
  toc: string
}

export const ui: Record<'en' | 'pt', Translation> = {
  en: {
    title: 'Thiago Colman',
    subtitle: 'Full Stack Engineer writing about software, learning and professional growth',
    description:
      'Official blog of Thiago Colman, Full Stack Engineer specialized in Ruby on Rails and React. Writing about software engineering, scalable SaaS architecture, clean code, product development, and reflections on learning, communication, decision-making, and professional growth. Practical insights for developers who want to grow technically and personally.',
    posts: 'Posts',
    tags: 'Tags',
    about: 'About',
    toc: 'Table of Contents',
  },
  pt: {
    title: 'Thiago Colman',
    subtitle: 'Engenheiro Full Stack escrevendo sobre software, aprendizado e crescimento profissional',
    description:
      'Blog oficial de Thiago Colman, Engenheiro Full Stack especializado em Ruby on Rails e React. Escrevendo sobre engenharia de software, arquitetura SaaS escalável, código limpo, desenvolvimento de produto e reflexões sobre aprendizado, comunicação, tomada de decisão e crescimento profissional.',
    posts: 'Artigos',
    tags: 'Tags',
    about: 'Sobre',
    toc: 'Sumário',
  },
}


