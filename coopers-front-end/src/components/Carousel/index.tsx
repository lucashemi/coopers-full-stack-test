import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { carouselData } from "../../constants/defaultPosts";
import { CarouselCard } from "../CarouselCard";

import "swiper/swiper-bundle.css";
import styles from "./styles.module.css";

export function Carousel() {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
        pagination={{
          clickable: true,
          el: `.${styles.swiperPagination}`,
          bulletClass: styles.swiperBullet,
          bulletActiveClass: styles.swiperBulletActive,
        }}
        className={styles.swiper}
      >
        {carouselData.map((post) => (
          <SwiperSlide key={post.id}>
            <CarouselCard
              image={post.image}
              imageAlt={post.imageAlt}
              tag={post.tag}
              title={post.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.swiperPagination}></div>
    </div>
  );
}
