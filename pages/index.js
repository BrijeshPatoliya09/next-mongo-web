import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Rating from "react-rating";
import baseUrl from "../helpers/baseUrl";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const HomePage = ({ products }) => {
  const router = useRouter();
  return (
    <>
      <div className="container-fluid">
        <div className="row px-5">
          <div className="my-5">
            {" "}
            <h2>
              Electronic <b>Products</b>
            </h2>
          </div>
          <div className="col-md-12 d-flex product-card mb-4">
            <div className="col-10">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
                data-interval="0"
              >
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="row">
                      <Carousel
                        ssr={false}
                        partialVisbile={false}
                        responsive={responsive}
                        containerclassName="carousel-container-with-scrollbar"
                      >
                        {products.map((v) => (
                          <div
                            className="thumb-wrapper"
                            onClick={() => router.push(`/product/${v._id}`)}
                          >
                            <div className="img-box">
                              <img
                                src={v.image}
                                className="img-responsive"
                                alt=""
                              />
                            </div>
                            <div className="thumb-content">
                              <h4>{v.name}</h4>
                              <p
                                className="item-price mb-1"
                                style={{ fontSize: "15px" }}
                              >
                                <strike>${v.price}</strike>{" "}
                                <span>
                                  $
                                  {v.price -
                                    (v.price * (v.discount / 100)).toFixed(2)}
                                </span>
                              </p>
                              <div className="star-rating">
                                <Rating
                                  emptySymbol="bi bi-star text-warning me-1"
                                  placeholderSymbol="bi bi-star-half text-warning me-1"
                                  fullSymbol="bi bi-star-fill text-warning me-1"
                                  initialRating={v.rating}
                                  readonly
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-2 d-flex align-items-center"
              style={{
                margin: "50px auto",
                padding: "0 50px",
                flexDirection: "column",
              }}
            >
              <h2>TV & Appliances</h2>
              <div className="mt-5">
                <Link
                  href="/product/catagory/TV & Appliances"
                  className="btn btn-primary"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-12 d-flex product-card mb-4">
            <div className="col-10">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
                data-interval="0"
              >
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="row">
                      <Carousel
                        ssr={false}
                        partialVisbile={false}
                        responsive={responsive}
                        containerclassName="carousel-container-with-scrollbar"
                      >
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-2 d-flex align-items-center"
              style={{
                margin: "50px auto",
                padding: "0 50px",
                flexDirection: "column",
              }}
            >
              <h2>SmartPhones & Computers</h2>
              <div className="mt-5">
                <button className="btn btn-primary">View All</button>
              </div>
            </div>
          </div>
          <div className="col-md-12 d-flex product-card mb-4">
            <div className="col-10">
              <div
                id="myCarousel"
                className="carousel slide"
                data-ride="carousel"
                data-interval="0"
              >
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="row">
                      <Carousel
                        ssr={false}
                        partialVisbile={false}
                        responsive={responsive}
                        containerclassName="carousel-container-with-scrollbar"
                      >
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-wrapper">
                          <div className="img-box">
                            <img
                              src="https://rukminim1.flixcart.com/image/200/200/krtjgcw0/headphone/d/9/g/au-mh501-maono-original-imag5j35rffkwpac.jpeg"
                              className="img-responsive"
                              alt=""
                            />
                          </div>
                          <div className="thumb-content">
                            <h4>Apple iPad</h4>
                            <p className="item-price mb-1">
                              <strike>$400.00</strike> <span>$369.00</span>
                            </p>
                            <div className="star-rating">
                              <Rating
                                emptySymbol="bi bi-star text-warning me-1"
                                placeholderSymbol="bi bi-star-half text-warning me-1"
                                fullSymbol="bi bi-star-fill text-warning me-1"
                                initialRating={2.5}
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-2 d-flex align-items-center"
              style={{
                margin: "50px auto",
                padding: "0 50px",
                flexDirection: "column",
              }}
            >
              <h2>Other Ascessories</h2>
              <div className="mt-5">
                <button className="btn btn-primary">View All</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}

export default HomePage;
