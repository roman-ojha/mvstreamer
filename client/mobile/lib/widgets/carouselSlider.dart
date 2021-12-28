/*
  -> dependencies:
  -> flutter pub add carousel_slider
  -> flutter pub add smooth_page_indicator
*/

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class Carousel extends StatefulWidget {
  const Carousel({Key? key}) : super(key: key);

  @override
  _CarouselState createState() => _CarouselState();
}

class _CarouselState extends State<Carousel> {
  var carouselActiveIndex = 0;
  final carouselDatas = [
    {
      "image": "assets/images/carousel_Image_01.jpg",
      "songTitle": "Kavhi Khushi Kavi Gam",
      "singer": "Sonu Nigam",
    },
    {
      "image": "assets/images/carousel_Image_02.jpg",
      "songTitle": "Kavhi Khushi Kavi Gam",
      "singer": "Sonu Nigam",
    },
    {
      "image": "assets/images/carousel_Image_03.jpg",
      "songTitle": "Kavhi Khushi Kavi Gam",
      "singer": "Sonu Nigam",
    }
  ];

  Widget buildCarouselIndicator() {
    return AnimatedSmoothIndicator(
      activeIndex: carouselActiveIndex,
      count: carouselDatas.length,
      effect: const WormEffect(
        dotColor: Colors.white24,
        activeDotColor: Colors.white,
        dotWidth: 25.0,
        dotHeight: 4.0,
      ),
    );
  }

  var singleEntityheight = 280.0;
  Widget carouselSingleEntity(
      {required String image,
      required String songtitle,
      required String singer}) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        SizedBox(
          height: singleEntityheight,
          width: double.infinity,
          child: FittedBox(
            child: Image.asset(image),
            fit: BoxFit.fill,
          ),
        ),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.only(left: 25.0),
          height: singleEntityheight,
          alignment: Alignment.bottomLeft,
          decoration: const BoxDecoration(
            gradient: RadialGradient(
              stops: [
                0,
                1,
              ],
              colors: [
                Colors.transparent,
                Color(0x2E000000),
              ],
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                width: 200,
                child: Text(
                  songtitle,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 25.0,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(
                height: 5.0,
              ),
              Text(
                "Singer: $singer",
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 15.0,
                ),
              ),
              const SizedBox(
                height: 10.0,
              ),
              const Icon(
                Icons.play_circle_filled_rounded,
                color: Colors.white,
                size: 50.0,
              ),
              const SizedBox(
                height: 20.0,
              )
            ],
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        CarouselSlider.builder(
          options: CarouselOptions(
            height: singleEntityheight,
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 2),
            viewportFraction: 1,
            // 'viewportFraction' when we want to show only one picture at once
            // enlargeCenterPage: true,
            // enlargeStrategy: CenterPageEnlargeStrategy.height,
            // pageSnapping:false
            onPageChanged: (index, reason) {
              // here this function get triggured every time when corousel image get changed
              setState(() => carouselActiveIndex = index);
            },
          ),
          itemCount: carouselDatas.length,
          itemBuilder: (context, index, realIndex) {
            final carouselData = carouselDatas[index];
            return carouselSingleEntity(
              image: carouselData["image"].toString(),
              songtitle: carouselData["songTitle"].toString(),
              singer: carouselData["singer"].toString(),
            );
          },
        ),
        Positioned(
          top: singleEntityheight - 15,
          child: buildCarouselIndicator(),
        )
      ],
    );
  }
}
