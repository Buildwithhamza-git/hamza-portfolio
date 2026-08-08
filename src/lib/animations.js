import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = {
  power2: 'power2.out',
  power3: 'power3.out',
  power4: 'power4.out',
  expo: 'expo.out',
}

export { gsap, ScrollTrigger }
