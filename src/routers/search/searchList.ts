import INuxtRoute from '@/interfaces/app/INuxtRoute'

export default function(
  resolve: (dirname: string, routeDir: string) => string
): INuxtRoute {
  return {
    name: 'searchList',
    path: '/list',
    component: resolve(__dirname, '../../routed-pages/search/searchList.vue')
  }
}
