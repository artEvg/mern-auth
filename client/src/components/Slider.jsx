import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Slider.css"

const ProductSlider = ({ products }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		centerPadding: "20px",
		responsive: [
			{
				breakpoint: 1024,
				settings: { slidesToShow: 3, slidesToScroll: 3 },
			},
			{
				breakpoint: 768,
				settings: { slidesToShow: 2, slidesToScroll: 2 },
			},
			{
				breakpoint: 480,
				settings: { slidesToShow: 1, slidesToScroll: 1 },
			},
		],
	}

	return (
		<Slider {...settings}>
			{products.map(product => (
				<div
					className='slider'
					key={product._id}
					style={{ padding: "50px, 20px" }}>
					<div className='product-card'>
						<div className='product-image'>
							{product.images && product.images.length > 0 ? (
								<img
									src={product.images[0].url}
									alt={product.name}
								/>
							) : (
								<p>Нет изображения</p>
							)}
						</div>
						<div className='product-info'>
							<h3>{product.name}</h3>
							<p className='description'>{product.description}</p>
							<div className='product-footer'>
								<span className='price'>{product.price} ₽</span>
								<span className='stock'>Осталось: {product.stock}</span>
							</div>
							<button className='add-to-cart-btn'>В корзину</button>
						</div>
					</div>
				</div>
			))}
		</Slider>
	)
}

export default ProductSlider
