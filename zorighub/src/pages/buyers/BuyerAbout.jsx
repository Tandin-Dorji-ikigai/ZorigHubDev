import React, { useEffect } from "react";
import BuyerHeader from "@/components/buyer/BuyerNav";
import BuyerFooter from "@/components/buyer/BuyerFooter";
import { FaArrowRight } from "react-icons/fa";
import image from "@/assets/images/festival.jpg";

/* ---------- Pinterest Feed Data ---------- */
const feed = [
    {
        type: "hero",
        title: "Preserving Bhutan’s Living Heritage",
        body:
            "Discover the 13 traditional arts of Bhutan — Zorig Chusum — living crafts shaping the Land of the Thunder Dragon.",
        ctas: [
            { label: "Explore the Arts", href: "#arts" },
            { label: "Meet Artisans", href: "/buyer/artisans" },
        ],
        img: image,
    },
    {
        type: "video",
        title: "Mastering Bhutan’s Traditional Arts",
        body:
            "A short documentary on how artisans keep the Zorig Chusum alive in modern Bhutan.",
        youtube: "https://www.youtube.com/embed/y5z3oX9K0do",
    },
    {
        type: "craft",
        tag: "Lhadri — Thangka",
        title: "Sacred scroll painting",
        body:
            "Natural pigments, strict iconometry, meditative practice — thangkas carry centuries of lineage.",
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        cta: { label: "Shop Thangka", href: "#" },
    },
    {
        type: "quote",
        body:
            "“Craft is the visible edge of culture. When we support artisans, we preserve stories.”",
        author: "ZorigHub",
    },
    {
        type: "craft",
        tag: "Shingzo — Wood",
        title: "Temple woodwork",
        body:
            "Intricate carving for windows, pillars and cornices — hand tools, heart, and heritage.",
        img: image,
        cta: { label: "Meet Artisans", href: "#" },
    },
    {
        type: "article",
        tag: "Festivals",
        title: "Tshechu: The Masked Dance Festival",
        body:
            "Sacred masked dances where centuries-old stories come alive through costume and choreography.",
        img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop",
    },
    {
        type: "craft",
        tag: "Tsharzo — Bamboo",
        title: "Bangchung baskets",
        body:
            "Utility turned art: bamboo weaving patterns that vary by region and family tradition.",
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
        cta: { label: "Shop Baskets", href: "#" },
    },
    {
        type: "craft",
        tag: "Lugzo — Bronze",
        title: "Lost-wax casting",
        body:
            "From palm-sized amulets to monumental Buddhas — each piece begins in beeswax.",
        img: image,
        cta: { label: "View Collection", href: "#" },
    },
    {
        type: "article",
        tag: "Sustainability",
        title: "Preserving Tradition in Modern Bhutan",
        body:
            "Ancient techniques adapted for today — without losing authenticity or environmental balance.",
        img: image,
    },
    {
        type: "craft",
        tag: "Dhezho — Paper",
        title: "Daphne bark paper",
        body:
            "Durable, insect-resistant, handmade — once scripture paper, now design staple.",
        img: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop",
        cta: { label: "Shop Paper Goods", href: "#" },
    },
    {
        type: "article",
        tag: "Artisans",
        title: "Masters & Apprentices",
        body:
            "How knowledge passes hand-to-hand in workshops and vocational schools.",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    {
        type: "cta",
        title: "Support Bhutan’s Living Heritage",
        body:
            "Your purchase sustains livelihoods and keeps tradition alive — thank you.",
        ctas: [
            { label: "Shop Handicrafts", href: "#" },
            { label: "Visit Bhutan", href: "#" },
        ],
    },
];

/* ---------- Card Components ---------- */
const CardShell = ({ children }) => (
    <div className="mb-6 break-inside-avoid rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
        {children}
    </div>
);

const Img = ({ src, alt }) => (
    <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover rounded-t-2xl"
        loading="lazy"
    />
);

const Tag = ({ children }) => (
    <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary">
        {children}
    </span>
);

const HeroCard = ({ item }) => (
    <CardShell>
        <Img src={item.img} alt={item.title} />
        <div className="p-5">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-[#1C2733]">
                {item.title}
            </h2>
            <p className="text-gray-700 mb-4">{item.body}</p>
            <div className="flex flex-wrap gap-2">
                {item.ctas?.map((c, i) => (
                    <a
                        key={i}
                        href={c.href}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white font-semibold hover:bg-darkred transition"
                    >
                        {c.label}
                    </a>
                ))}
            </div>
        </div>
    </CardShell>
);

const VideoCard = ({ item }) => (
    <CardShell>
        <div className="relative pb-[56.25%] h-0 rounded-t-2xl overflow-hidden">
            <iframe
                className="absolute inset-0 w-full h-full"
                src={item.youtube}
                title={item.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
        <div className="p-5">
            <h3 className="text-xl font-bold mb-2 text-[#1C2733]">{item.title}</h3>
            <p className="text-gray-700">{item.body}</p>
        </div>
    </CardShell>
);

const CraftCard = ({ item }) => (
    <CardShell>
        <Img src={item.img} alt={item.title} />
        <div className="p-5">
            {item.tag && <Tag>{item.tag}</Tag>}
            <h3 className="text-xl font-bold mt-1 mb-2 text-[#1C2733]">{item.title}</h3>
            <p className="text-gray-700 mb-4">{item.body}</p>
            {item.cta && (
                <a
                    href={item.cta.href}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                    {item.cta.label}
                    <FaArrowRight className="text-sm" />
                </a>
            )}
        </div>
    </CardShell>
);

const ArticleCard = ({ item }) => (
    <CardShell>
        <Img src={item.img} alt={item.title} />
        <div className="p-5">
            {item.tag && <Tag>{item.tag}</Tag>}
            <h3 className="text-xl font-bold mt-1 mb-2 text-[#1C2733]">{item.title}</h3>
            <p className="text-gray-700">{item.body}</p>
        </div>
    </CardShell>
);

const QuoteCard = ({ item }) => (
    <CardShell>
        <div className="p-6">
            <p className="text-lg italic text-[#1C2733]">{item.body}</p>
            {item.author && (
                <p className="mt-3 text-sm text-gray-500">— {item.author}</p>
            )}
        </div>
    </CardShell>
);

const CTAStack = ({ item }) => (
    <CardShell>
        <div className="p-6 text-center bg-primary/5">
            <h3 className="text-2xl font-bold mb-3 text-[#1C2733]">{item.title}</h3>
            <p className="text-gray-700 mb-5">{item.body}</p>
            <div className="flex flex-wrap justify-center gap-2">
                {item.ctas?.map((c, i) => (
                    <a
                        key={i}
                        href={c.href}
                        className="inline-flex items-center px-5 py-2 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition"
                    >
                        {c.label}
                    </a>
                ))}
            </div>
        </div>
    </CardShell>
);

/* ---------- Page ---------- */
export default function BuyerAbout() {
    useEffect(() => {
        document.title = "ZorigHub — About";
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <BuyerHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
                    {feed.map((item, idx) => {
                        switch (item.type) {
                            case "hero":
                                return <HeroCard key={idx} item={item} />;
                            case "video":
                                return <VideoCard key={idx} item={item} />;
                            case "craft":
                                return <CraftCard key={idx} item={item} />;
                            case "article":
                                return <ArticleCard key={idx} item={item} />;
                            case "quote":
                                return <QuoteCard key={idx} item={item} />;
                            case "cta":
                                return <CTAStack key={idx} item={item} />;
                            default:
                                return null;
                        }
                    })}
                </div>

                <div id="arts" className="h-2" />
            </main>

            <BuyerFooter />
        </div>
    );
}
