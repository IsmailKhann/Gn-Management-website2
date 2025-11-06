import asyncio
import sys
import os
sys.path.append('/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path('/app/backend')
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Clear existing data
    await db.projects.delete_many({})
    await db.team.delete_many({})
    await db.news.delete_many({})
    
    # Seed Projects
    projects = [
        # Featured Projects
        {"id": "628-summit", "name": "628 Summit Avenue (Singh Tower)", "address": "628 Summit Avenue, Jersey City", "category": "Featured", "units": 200, "square_feet": "150,000", "year": "2025", "status": "Completed", "description": "Our flagship high-rise project, Singh Tower, proudly rising at 628 Summit Avenue. This 30-story development features diverse amenities and a public park revitalizing the Bergen Arches corridor.", "image_url": "https://images.unsplash.com/photo-1740904259901-2063800012ab?crop=entropy&cs=srgb&fm=jpg&q=85"},
        {"id": "161-van-wagenen", "name": "161 Van Wagenen Avenue", "address": "161 Van Wagenen Avenue, Jersey City", "category": "Featured", "units": 124, "year": "2024", "status": "Completed", "description": "Our newest luxury rental development, completed in 2024. A 13-story development featuring 124 thoughtfully designed units with upscale finishes and amenity-rich living.", "image_url": "https://images.unsplash.com/photo-1740904257914-45adcd97040a?crop=entropy&cs=srgb&fm=jpg&q=85"},
        {"id": "68-oakland", "name": "68 Oakland Avenue", "address": "68 Oakland Avenue, Jersey City", "category": "Featured", "image_url": "https://images.unsplash.com/photo-1740904258597-ac3105406453?crop=entropy&cs=srgb&fm=jpg&q=85"},
        {"id": "giles-ave", "name": "Giles Avenue Development", "address": "Giles Avenue, Jersey City", "category": "Featured", "image_url": "https://images.pexels.com/photos/34596457/pexels-photo-34596457.jpeg"},
        {"id": "96-cottage", "name": "96 Cottage Street", "address": "96 Cottage Street, Jersey City", "category": "Featured", "image_url": "https://images.pexels.com/photos/34558140/pexels-photo-34558140.png"},
        {"id": "bayonne", "name": "Bayonne Development", "address": "Bayonne, New Jersey", "category": "Featured", "image_url": "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg"},
        
        # Upcoming Projects
        {"id": "102-106-cottage", "name": "102-106 Cottage Street", "address": "102-106 Cottage Street, Jersey City", "category": "Upcoming", "image_url": "https://images.unsplash.com/photo-1758974835125-83ba4f9d7e25?crop=entropy&cs=srgb&fm=jpg&q=85"},
        {"id": "111-115-giles", "name": "111-115 Giles Avenue", "address": "111-115 Giles Avenue, Jersey City", "category": "Upcoming"},
        {"id": "158-oakland", "name": "158 Oakland Avenue", "address": "158 Oakland Avenue, Jersey City", "category": "Upcoming"},
        {"id": "18-20-e15th", "name": "18-20 E 15th Street", "address": "18-20 E 15th Street, Jersey City", "category": "Upcoming"},
        {"id": "192-cambridge", "name": "192 Cambridge Avenue", "address": "192 Cambridge Avenue, Jersey City", "category": "Upcoming"},
        
        # Under Construction
        {"id": "122-terrace", "name": "122 Terrace Avenue", "address": "122 Terrace Avenue, Jersey City", "category": "Under Construction", "image_url": "https://images.unsplash.com/photo-1745429523617-0d837856ca35?crop=entropy&cs=srgb&fm=jpg&q=85"},
        {"id": "136-logan", "name": "136 Logan Avenue", "address": "136 Logan Avenue, Jersey City", "category": "Under Construction"},
        {"id": "138-lake", "name": "138 Lake Street", "address": "138 Lake Street, Jersey City", "category": "Under Construction"},
        {"id": "139-congress", "name": "139 Congress Street", "address": "139 Congress Street, Jersey City", "category": "Under Construction"},
        {"id": "147-terrace", "name": "147 Terrace Avenue", "address": "147 Terrace Avenue, Jersey City", "category": "Under Construction"},
        
        # Completed Projects
        {"id": "102-hopkins", "name": "102 Hopkins Avenue", "address": "102 Hopkins Avenue, Jersey City", "category": "Completed", "image_url": "https://images.unsplash.com/photo-1745429523635-ad375f836bf2?crop=entropy&cs=srgb&fm=jpg&q=85"},
        {"id": "121-125-lake", "name": "121-125 Lake Street", "address": "121-125 Lake Street, Jersey City", "category": "Completed"},
        {"id": "131-133-clifton", "name": "131-133 Clifton Place", "address": "131-133 Clifton Place, Jersey City", "category": "Completed"},
        {"id": "nanak-niwas", "name": "Nanak Niwas", "address": "3224 Kennedy Boulevard, Jersey City", "category": "Completed", "units": 42, "year": "2019", "description": "Located in the vibrant Journal Square neighborhood, Nanak Niwas is a mid-sized rental property offering spacious apartments and easy access to transit.", "image_url": "https://images.unsplash.com/photo-1742811029-dd22535dfad1?crop=entropy&cs=srgb&fm=jpg&q=85"},
        
        # Affordable Housing
        {"id": "metrovue", "name": "Metrovue Apartments", "address": "Jersey City, NJ", "category": "Affordable Housing", "units": 18, "status": "Reserved for workforce housing", "description": "18 units reserved for workforce housing, providing quality affordable housing options for the Jersey City community."},
        {"id": "125-lake-affordable", "name": "125 Lake Street Affordable Units", "address": "125 Lake Street, Jersey City", "category": "Affordable Housing", "units": 2, "status": "Reserved for workforce housing", "description": "2 units reserved for workforce housing as part of our commitment to inclusive development."},
    ]
    
    await db.projects.insert_many(projects)
    
    # Seed Team Members
    team = [
        {
            "id": "onkar-singh",
            "name": "Onkar Singh",
            "role": "Founder & CEO",
            "bio": "GN Management is a real estate development firm founded by Mr. Onkar Singh in 2010. Mr. Singh sought to invest in improving his Jersey City community through real estate. He envisioned changing the mechanical experience of the industry while pushing innovation and design. Known for his kind heart and unwavering belief in lifting others, Onkar Singh has become a source of hope for countless women, students, and professionals. As a father of two young daughters, his mission is deeply personal: to build a world where women are valued, respected, and free to succeed.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/jugj3avt_Mr.%20Onkar%20Singh.jpg"
        },
        {
            "id": "harleen-kaur",
            "name": "Harleen Kaur",
            "role": "Managing Director",
            "bio": "As Managing Director, Harleen Kaur brings strategic vision and operational excellence to GN Management. Her leadership drives the company's continued growth and success in the Jersey City real estate market.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/ot85dgo9_Ms.%20Harleen.jpg"
        },
        {
            "id": "arvinder-singh",
            "name": "Arvinder Singh",
            "role": "President",
            "bio": "Arvinder Singh serves as President of GN Management, overseeing daily operations and ensuring the highest standards of quality and service across all developments.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/4u0rjzib_Mr.%20Arvinder.jpeg"
        },
        {
            "id": "anthony",
            "name": "Anthony",
            "role": "Vice President",
            "bio": "Anthony plays a key role in GN Management's operations as Vice President, contributing to strategic initiatives and ensuring excellence in project execution and client relationships.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/7cv94nmm_Mr.%20Anthony.jpeg"
        }
    ]
    
    await db.team.insert_many(team)
    
    # Seed News Articles
    news = [
        {
            "id": "singh-tower-completion",
            "title": "Singh Tower Completed: A New Jersey City Landmark",
            "date": "2025",
            "content": "We are proud to announce the completion of Singh Tower, our flagship high-rise project at 628 Summit Avenue. This 30-story development represents a major milestone in Jersey City's skyline, featuring diverse amenities and a public park designed to revitalize the Bergen Arches corridor. Singh Tower stands as a testament to our commitment to creating design-forward, community-centric developments that enhance the urban fabric of Jersey City.",
            "short_content": "Singh Tower, our flagship 30-story high-rise at 628 Summit Avenue, is now complete and proudly rising in the Jersey City skyline.",
            "image_url": "https://images.unsplash.com/photo-1740904259901-2063800012ab?crop=entropy&cs=srgb&fm=jpg&q=85"
        },
        {
            "id": "van-wagenen-inauguration",
            "title": "161 Van Wagenen Avenue Inaugurated by Mayor",
            "date": "2024",
            "content": "Our premium high-rise project at 161 Van Wagenen Avenue was completed and inaugurated by Mayor Steven Fulop in 2024. This 13-story development features 124 thoughtfully designed units that blend upscale finishes, smart layouts, and amenity-rich living. The project exemplifies our commitment to high-quality urban housing and has been warmly welcomed by the Jersey City community.",
            "short_content": "161 Van Wagenen Avenue, featuring 124 luxury units, was inaugurated by Mayor Steven Fulop in 2024.",
            "image_url": "https://images.unsplash.com/photo-1740904257914-45adcd97040a?crop=entropy&cs=srgb&fm=jpg&q=85"
        },
        {
            "id": "10-year-anniversary",
            "title": "GN Management Celebrates 10 Years of Excellence",
            "date": "2020",
            "content": "This year marks a significant milestone as GN Management celebrates 10 years of building resilient, design-forward communities in Jersey City. Since our founding in 2010, we have completed over 50 projects, grown to a team of 30+ employees, and established ourselves as a trusted partner in Jersey City's real estate development landscape. We are grateful to our investors, partners, tenants, and the Jersey City community for their continued support. As we look to the future, we remain committed to our founding values of empathy, trust, and family while pushing the boundaries of innovation and design.",
            "short_content": "GN Management celebrates a decade of excellence in Jersey City real estate development.",
            "image_url": "https://images.unsplash.com/photo-1542811029-dd22535dfad1?crop=entropy&cs=srgb&fm=jpg&q=85"
        },
        {
            "id": "women-empowerment",
            "title": "Empowering Women: The Heart of GN Management",
            "date": "2024",
            "content": "Onkar Singh's story is not one of titles or recognition but of compassion and purpose. Known for his kind heart and unwavering belief in lifting others, Onkar Singh has become a source of hope for countless women, students, and professionals who've faced setbacks in their journey. For Onkar Singh, helping women is not charity; it's about restoring dignity and confidence. This belief is the foundation of Bassi Management Group, where 99% of the staff are women. Onkar Singh prioritizes women's employment because he understands their challenges: balancing multiple responsibilities, facing suppression, and dealing with barriers that often keep them from professional growth. As a father of two young daughters, his mission is personal – he works to empower women today while building a world where his own daughters, and all young girls, can thrive without barriers tomorrow. To Onkar Ji, empowerment has a ripple effect. When you help one woman stand tall, she inspires her family, her community, and generations to come.",
            "short_content": "At GN Management, women's empowerment is not just a value – it's our foundation, with 99% women workforce at Bassi Management Group.",
            "image_url": "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=srgb&fm=jpg&q=85"
        }
    ]
    
    await db.news.insert_many(news)
    
    print("✅ Database seeded successfully!")
    print(f"   - {len(projects)} projects")
    print(f"   - {len(team)} team members")
    print(f"   - {len(news)} news articles")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
