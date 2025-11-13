
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


const slides = [
  {
    title: 'Cleanliness Campaign',
    subtitle: 'Ensuring a clean and healthy environment for everyone.',
    img: 'https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2024/05/06/bd_clean_6.jpg',
    ctaText: 'Learn More',
    ctaHref: '#'
  },
  {
    title: 'Community Cleaning',
    subtitle: 'Together we build a stronger, cleaner community.',
    img: 'https://www.barcikbd.org/wp-content/uploads/2022/09/received_403890155261921.webp',
    ctaText: 'Join Us',
    ctaHref: '#'
  },
  {
    title: 'Awareness & Engagement',
    subtitle: 'Promoting awareness to protect our environment.',
    img: 'https://www.bdclean.org/storage/media-print-online/images/1751801138_5334_515678722_710386361918182_3754843977889604729_n.jpg',
    ctaText: 'Get Involved',
    ctaHref: '#'
  }
]

export default function HeroBanner() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-100 max-w-xl drop-shadow">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.ctaHref}
                  className="inline-block mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:brightness-95 transition"
                >
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
    </section>
  )
}
