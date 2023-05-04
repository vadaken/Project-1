"use strict";

import Swiper, { Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from "swiper";
import { EffectCube, EffectFlip, EffectCards, EffectCoverflow, EffectFade } from "swiper";
import gsap, { Power2, Power4 } from "gsap";
Swiper.use([Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation]);
Swiper.use([EffectCube, EffectFlip, EffectCards, EffectCoverflow, EffectFade]);

document.addEventListener("DOMContentLoaded", () => {

	// settings of the sliders, pagination count =========================================>

	const swiperImg = new Swiper(".slider-img", {
		loop: false,
		speed: 1800,
		parallax: true,
		effect: "cube",
		pagination: {
			el: ".slider-pagination-count .total",
			type: "custom",
			renderCustom: (swiper, current, total) => {
				let totalResult = total >= 10 ? total : `0${total}`;

				return totalResult;
			}
		}
	});

	const swiperText = new Swiper(".slider-text", {
		direction: "horizontal",
		effect: "slider",
		loop: false,
		speed: 1800,
		mousewheel: {
			invert: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true
		},
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next"
		}
	});

	const imgTextSync = () => {
		swiperImg.controller.control = swiperText;
		swiperText.controller.control = swiperImg;
	};

	// RING =========================================================>

	const ring = document.querySelector(".slider-gear");

	const ringAnimation = () => {
		swiperText.on("slideNextTransitionStart", () => {
			gsap.to(ring, {
				rotation: "+=270",
				duration: 3,
				ease: Power4.out
			});
		});

		swiperText.on("slidePrevTransitionStart", () => {
			gsap.to(ring, {
				rotation: "-=270",
				duration: 3,
				ease: Power4.out
			});
		});
	};

	// pagination count of sliders =============================================>

	let pagCount = document.querySelector(".slider-pagination-count .current");
	let pagCurrent = document.querySelector(".slider-pagination-curren__num");

	swiperText.on("slideChange", () => {
		let ind = swiperText.realIndex + 1;
		let indResult = ind >= 10 ? ind : `0${ind}`;
		gsap.to(pagCount, {
			force3D: true,
			duration: 0.2,
			ease: Power4.out,
			opacity: 0,
			y: -15,
			onComplete: () => {
				gsap.to(pagCount, {
					force3D: true,
					duration: 0.2,
					ease: Power4.out,
					y: 25
				});
				pagCount.innerHTML = indResult;
				pagCurrent.innerHTML = indResult;
			}
		});
		gsap.to(pagCount, {
			force3D: true,
			duration: 0.2,
			ease: Power4.out,
			opacity: 1,
			delay: 0.5,
			y: 0
		});
	});

	// call a function =========================================================>

	imgTextSync();
	ringAnimation();

});