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
    
    # Seed Team Members (using highest quality images)
    team = [
        {
            "id": "onkar-singh",
            "name": "Mr. Onkar Singh",
            "role": "Founder & CEO",
            "bio": "GN Management is a real estate development firm founded by Mr. Onkar Singh in 2010. Mr. Singh sought to invest in improving his Jersey City community through real estate. He envisioned changing the mechanical experience of the industry while pushing innovation and design. Known for his kind heart and unwavering belief in lifting others, Onkar Singh has become a source of hope for countless women, students, and professionals. As a father of two young daughters, his mission is deeply personal: to build a world where women are valued, respected, and free to succeed.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/20etbzdl_Mr.%20Onkar%20Singh.jpg"
        },
        {
            "id": "harleen-kaur",
            "name": "Ms. Harleen Kaur",
            "role": "Managing Director",
            "bio": "As Managing Director, Harleen Kaur brings strategic vision and operational excellence to GN Management. Her leadership drives the company's continued growth and success in the Jersey City real estate market.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/fx7eitxu_Ms.%20Harleen.jpg"
        },
        {
            "id": "arvinder-singh",
            "name": "Mr. Arvinder Singh",
            "role": "President",
            "bio": "Arvinder Singh serves as President of GN Management, overseeing daily operations and ensuring the highest standards of quality and service across all developments.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/4mxxdhb2_Mr.%20Arvinder.jpeg"
        },
        {
            "id": "anthony",
            "name": "Mr. Anthony",
            "role": "Vice President",
            "bio": "Anthony plays a key role in GN Management's operations as Vice President, contributing to strategic initiatives and ensuring excellence in project execution and client relationships.",
            "image_url": "https://customer-assets.emergentagent.com/job_jersey-estates/artifacts/0e3z05oj_Mr.%20Anthony.jpeg"
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
            "date": "2025",
            "content": "Celebrating 10 Years of Building Communities\n\n2025 marks a major milestone for GN Management - our 10th Anniversary.\n\nFrom humble beginnings to a robust portfolio of high-rise residences, thriving communities, and transformative projects across Jersey City, our journey has been nothing short of remarkable.\n\nOver the past decade, GN Management has stayed true to its core vision: creating exceptional living experiences that combine comfort, convenience, and contemporary design. From Journal Square to The Heights and beyond, every building we've developed or managed tells a story of progress, passion, and people.\n\nA heartfelt thank you to our residents, partners, and dedicated team members - you've been an integral part of this journey. As we step into the next chapter, we're more energized than ever to build, grow, and innovate.\n\nHere's to the next decade of excellence.\n\nBecause at GN Management - we don't just manage buildings, we build legacies.",
            "short_content": "GN Management celebrates a decade of excellence in Jersey City real estate development - from humble beginnings to a robust portfolio of transformative projects.",
            "image_url": "https://images.unsplash.com/photo-1542811029-dd22535dfad1?crop=entropy&cs=srgb&fm=jpg&q=85"
        },
        {
            "id": "women-empowerment",
            "title": "Empowering Women: The Heart of GN Management",
            "date": "2024",
            "content": "Onkar Singh: A Guiding Light for Women Seeking a Second Chance\n\nOnkar Singh's story is not one of titles or recognition but of compassion and purpose. Known for his kind heart and unwavering belief in lifting others, Onkar Singh has become a source of hope for countless women, students, and professionals who've faced setbacks in their journey. He doesn't just talk about empowerment – he lives it every day through his actions.\n\nFor Onkar Singh, helping women is not charity; it's about restoring dignity and confidence. He deeply understands the silent struggles many women endure – career breaks because of family responsibilities, lost opportunities due to circumstances beyond their control, or simply a lack of support at the right time. Where society sees gaps in their resumes, Onkar Singh sees untapped potential. He chooses to invest his time, resources, and heart into giving these women the chance to rebuild their careers, stand on their own feet, and reclaim their dreams.\n\nThis belief is the foundation of Bassi Management Group, where 99% of the staff are women. Onkar Singh prioritizes women's employment because he understands their challenges: balancing multiple responsibilities, facing suppression, and dealing with barriers that often keep them from professional growth. By building a women-driven workforce, he not only provides opportunities but also helps women regain confidence, independence, and a renewed sense of purpose.\n\nWhat makes him truly remarkable is not just his vision but also his character. Onkar Singh is humble, down-to-earth, and always treats women with deep respect. As a father of two young daughters, his mission is personal – he works to empower women today while building a world where his own daughters, and all young girls, can thrive without barriers tomorrow.\n\nBut Onkar Ji's kindness extends beyond his organization. He treats everyone as family – whether an employee, a student, someone he meets outside, or even a random stranger. His humility and respect touch everyone, and people often see him not just a mentor but a genuine well-wisher who listens, supports, and uplifts without expecting anything in return.\n\nStudents also hold a special place in Onkar Ji's vision. He believes education is the strongest tool to create lasting change. Over the years, he has guided and supported countless young people, helping them find the courage and clarity they need to shape their future. Whether it's through mentorship, access to resources, or simply offering a listening ear, Onkar Ji always makes people feel seen and valued.\n\nTo Onkar Ji, empowerment has a ripple effect. When you help one woman stand tall, she inspires her family, her community, and generations to come. This belief drives his every initiative and every interaction. His work is not just about careers or education; it's about giving people the courage to dream again and the tools to make those dreams real.\n\nOnkar Singh is more than a mentor, more than a supporter – he is a true ally. His legacy is not written in accolades but in the lives he has touched: the woman who returned to her career after years away, the student who dared to dream big, the professional who found their way after losing confidence. Each story is a testament to his humility, family-like respect for all, and his unwavering belief that every person deserves a second chance.",
            "short_content": "Onkar Singh has always been passionate about helping women find their confidence and reclaim their independence. Through Bassi Management Group, where 99% of the workforce consists of women, he prioritizes women's employment and empowerment.",
            "image_url": "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=srgb&fm=jpg&q=85"
        },
        {
            "id": "lets-share-a-meal",
            "title": "GN Management Launches 'Let's Share a Meal' Community Initiative",
            "date": "2024",
            "content": "The Heart Behind Let's Share a Meal\n\nLet's Share a Meal is a volunteer-led nonprofit organization based in New Jersey committed to feeding the hungry with dignity, kindness, and love. Rooted in the Sikh traditions of Seva (selfless service) and Langar (a communal free kitchen open to all), we provide hot meals, emergency aid, and community support to those who need it most—across the U.S. and beyond.\n\nOur Mission: To build a world where no one is left behind—not at the dinner table, not in a crisis, not in life.\n\nOur Vision: To inspire a global movement where sharing a meal spreads the spirit of service and oneness across cultures, faiths, and borders.\n\nOur Guiding Values:\n• Seva isn't a choice. It's our way of life.\n• Oneness isn't a belief. It's our truth.\n• Equality isn't a dream. It's our foundation.\n\nFrom Leftover to a Legacy:\nIn 2011, at a New Jersey Gurudwara, Onkar Singh and Talwinder Singh noticed trays of uneaten food after a community program. Their initial attempt to donate to the Hoboken Shelter was met with challenges due to U.S. food safety laws requiring specific protocols. This experience led them to study the system—licensing, safety standards, nutritional requirements—and use it as a roadmap for a deeper mission.\n\nToday & Tomorrow: A Global Family of Service\nFrom a single act of seva in New Jersey, it has grown into a global movement. We operate in the U.S., U.K., India, and Australia, with new chapters emerging annually. Our activities include medical missions, monthly drives like \"Tasty Tuesday,\" and annual events around Vaisakhi and Thanksgiving.\n\nTasty Tuesday Program:\nThis is more than a monthly food drive; it's a community tradition rooted in compassion and inspired by the Sikh spirit of Langar. On the first Tuesday of every month, volunteers gather to prepare and serve fresh, hot meals for neighbors at Newark Penn Station at 6:00 PM.\n\nThe program aims to foster connection, reflection, and service in a fast-moving world.\n\nStep in, serve with us, and be the reason someone doesn't go to bed hungry.",
            "short_content": "GN Management supports 'Let's Share a Meal', a volunteer-led initiative feeding the hungry with dignity. Join us every first Tuesday at Newark Penn Station at 6:00 PM for Tasty Tuesday.",
            "image_url": "https://images.unsplash.com/photo-1593113598332-cd288d649433?crop=entropy&cs=srgb&fm=jpg&q=85"
        }
    ]
    
    await db.news.insert_many(news)
    
    print("✅ Database seeded successfully!")
    print(f"   - {len(projects)} projects")
    print(f"   - {len(team)} team members")
    print(f"   - {len(news)} news articles")
    print("\n📸 Team photos updated:")
    for member in team:
        print(f"   - {member['name']}: {member['role']}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
