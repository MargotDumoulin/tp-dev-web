export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      allMusics: '/musics',
      oneMusic: '/musics/:id',
      randomMusic: '/musics/random',
      oneMusicByTitle: '/musics/title/:title',
    },
  },
};
