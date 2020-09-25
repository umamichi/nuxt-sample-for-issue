import INuxtRoute from '@/interfaces/app/INuxtRoute'

export default function(
  resolve: (dirname: string, routeDir: string) => string
): INuxtRoute {
  return {
    name: 'detail',
    path: '/detail/:id/',
    component: resolve(__dirname, '../../routed-pages/job/detail.vue')
  }
}
