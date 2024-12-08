'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Share2, Heart, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  image: string
  category: string
  price: number
  originalPrice?: number
  badge?: {
    text: string
    color: string
  }
}

const baseProducts: Product[] = [
  {
    id: '1',
    name: 'Syltherine',
    image: '/images/syltherine.png',
    category: 'Stylish cafe chair',
    price: 2500000,
    originalPrice: 3500000,
    badge: {
      text: '-30%',
      color: 'bg-[#E97171]'
    }
  },
  {
    id: '2',
    name: 'Leviosa',
    image: '/images/leviosa.png',
    category: 'Stylish cafe chair',
    price: 2500000
  },
  {
    id: '3',
    name: 'Lolito',
    image: '/images/lolito.png',
    category: 'Luxury big sofa',
    price: 7000000,
    originalPrice: 14000000,
    badge: {
      text: '-50%',
      color: 'bg-[#E97171]'
    }
  },
  {
    id: '4',
    name: 'Respira',
    image: '/images/respira.png',
    category: 'Outdoor bar table and stool',
    price: 500000,
    badge: {
      text: 'New',
      color: 'bg-[#2EC1AC]'
    }
  }
];

const products: Product[] = Array(4).fill(baseProducts).flat();

const features = [
  {
    icon: '/images/trophy.png',
    title: 'High Quality',
    description: 'crafted from top materials'
  },
  {
    icon: '/images/tick.png',
    title: 'Warranty Protection',
    description: 'Over 2 years'
  },
  {
    icon: '/images/gift.png',
    title: 'Free Shipping',
    description: 'Order over 150 $'
  },
  {
    icon: '/images/support.png',
    title: '24 / 7 Support',
    description: 'Dedicated support'
  }
]

const paginationItems = [
  { label: '1', active: true },
  { label: '2', active: false },
  { label: '3', active: false },
  { label: 'Next', active: false }
]

export default function ShopHeader() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current
    if (container) {
      const cardWidth = 300 // Width of each card
      const containerWidth = container.offsetWidth
      const scrollAmount = direction === 'left' 
        ? -cardWidth 
        : cardWidth
      const newPosition = scrollPosition + scrollAmount

      // Ensure the new position is within bounds
      const maxScroll = container.scrollWidth - containerWidth
      const clampedPosition = Math.max(0, Math.min(newPosition, maxScroll))

      // Calculate the nearest card start position
      const nearestCardPosition = Math.round(clampedPosition / cardWidth) * cardWidth

      container.scrollTo({
        left: nearestCardPosition,
        behavior: 'smooth'
      })
      setScrollPosition(nearestCardPosition)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleScroll = () => {
        setScrollPosition(container.scrollLeft)
      }
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <section className="font-poppins">
        {/* Hero Section */}
        <div className="relative h-[300px] w-full">
          <Image
            src="/images/shop-cover.png"
            alt="Shop Cover"
            layout="fill" // Fills the container for background
            objectFit="cover" // Ensures it behaves like a background image
            quality={100}
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 " />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Shop
            </h1>
            <div className="flex items-center gap-2 text-[#000000] text-base">
              <Link href="/" className="hover:text-[#B88E2F] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span>Shop</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#F9F1E7] px-4 md:px-8 py-6">
          <div className=" max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Side */}
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors">
                <Image className="w-5 h-5" src='/images/filter-icon.png' alt="Filter" width={20} height={20}/>
                <span className="font-medium">Filter</span>
              </button>
              <div className="flex items-center gap-2 border-l border-[#9F9F9F] pl-8">
                <button className="hover:text-[#B88E2F] transition-colors">
                  <Image className="w-5 h-5" src='/images/dots-icon.png' alt="Dots" width={20} height={20}/>
                </button>
                <button className="hover:text-[#B88E2F] transition-colors">
                  <Image className="w-5 h-5" src='/images/list-icon.png' alt="List" width={20} height={20}/>
                </button>
              </div>
              <p className="text-[#9F9F9F] hidden md:block">
                Showing 1-16 of 32 results
              </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 w-[95%] lg:w-full mx-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs lg:text-base text-[#9F9F9F]">Show</span>
                <select className="text-xs lg:text-base bg-transparent border border-[#9F9F9F] rounded px-4 py-1 focus:outline-none focus:border-[#B88E2F]">
                  <option >16</option>
                  <option >32</option>
                  <option >48</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#9F9F9F] text-xs lg:text-base">Short by</span>
                <select className="text-xs lg:text-base bg-transparent border border-[#9F9F9F] rounded px-4 py-1 focus:outline-none focus:border-[#B88E2F]">
                  <option>Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listing Section */}
      <section className="py-16 md:py-16 px-4 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div 
              ref={containerRef}
              className="flex overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-4 px-[16px] sm:px-0"
            >
              {products.map((product) => (
                <div key={product.id} className="group flex-shrink-0 w-[280px] sm:w-auto">
                  <div className="relative bg-[#F4F5F7] rounded-sm overflow-hidden">
                    <Image
                      src={product.image || '/images/default.jpg'} // Fallback image in case of missing or invalid image
                      alt={product.name}
                      width={285}
                      height={301}
                      quality={100}
                      layout="responsive" // Ensures the image scales properly
                      className="w-full h-[301px] object-cover"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <button className="w-52 bg-white text-[#B88E2F] px-10 py-3 rounded-sm hover:bg-[#B88E2F] hover:text-white transition-colors duration-300">
                          Add to cart
                        </button>
                      </div>
                      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white">
                        <button className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors">
                          <Share2 className="w-5 h-5" />
                          Share
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors">
                          <BarChart2 className="w-5 h-5" />
                          Compare
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#B88E2F] transition-colors">
                          <Heart className="w-5 h-5" />
                          Wishlist
                        </button>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="absolute top-4 right-4">
                      {product.badge && (
                        <span className={`text-xs py-1 px-2 text-white rounded ${product.badge.color}`}>
                          {product.badge.text}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <p className="text-sm text-[#B3B3B3]">{product.category}</p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-lg font-semibold text-[#B88E2F]">
                          ${product.price.toLocaleString()}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-[#B3B3B3] line-through">
                            ${product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center gap-2">
                <button
                  className="bg-[#F4F5F7] p-2 rounded-full hover:bg-[#B88E2F] transition-colors"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {paginationItems.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full ${item.active ? 'bg-[#B88E2F] text-white' : 'bg-transparent'}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  className="bg-[#F4F5F7] p-2 rounded-full hover:bg-[#B88E2F] transition-colors"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}