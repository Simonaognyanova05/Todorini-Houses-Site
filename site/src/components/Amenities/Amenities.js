import './Amenities.css';
import { Link, useParams } from 'react-router-dom';
import AmenitiesItem from './AmenitiesItem';

const imageGroups = {
    guestHouseImages: [
        "https://i.imgur.com/QXfwpGs.jpeg",
        "https://i.imgur.com/fhU9oc1.jpeg",
        "https://i.imgur.com/nMxCb43.jpeg",
        "https://i.imgur.com/gm5vTJK.jpeg",
        "https://i.imgur.com/OsBJk4l.jpeg",
        "https://i.imgur.com/S0GMXd6.jpeg",
        "https://i.imgur.com/caOwnDU.jpeg",
        "https://i.imgur.com/2xqZan9.jpeg",
        "https://i.imgur.com/f9CBUgS.jpeg",
    ],
    spa: [
        "https://i.imgur.com/ZzvmiP9.jpeg",
        "https://i.imgur.com/M6mgScv.jpeg",
        "https://i.imgur.com/zWddZrU.jpeg",
        "https://i.imgur.com/FyRN37e.jpeg",
        "https://i.imgur.com/z6dpR4m.jpeg",
        "https://i.imgur.com/APOpTiA.jpeg",
        "https://i.imgur.com/ELR7MGJ.jpeg",

    ],
    mehana: [
        "https://i.imgur.com/R3STUBO.jpeg",
        "https://i.imgur.com/00fRr5b.jpeg",
        "https://i.imgur.com/W0BLVLS.jpeg",
        "https://i.imgur.com/7uZL1Em.jpeg",
        "https://i.imgur.com/rlR3Fvt.jpeg",
        "https://i.imgur.com/gatxjFm.jpeg",
        "https://i.imgur.com/EQwT2pj.jpeg",
        "https://i.imgur.com/0rChVOC.jpeg",
        "https://i.imgur.com/h7DvfP2.jpeg",
        "https://i.imgur.com/tPASTrG.jpeg",
        "https://i.imgur.com/QNhOgOU.jpeg",
        "https://i.imgur.com/eoePkl0.jpeg",

    ],
    menu: [
        "https://i.imgur.com/SpVhvUs.jpeg",
        "https://i.imgur.com/xgJVY84.jpeg",
        "https://i.imgur.com/srbCmlh.jpeg",
        "https://i.imgur.com/qNq3Fta.jpeg",
        "https://i.imgur.com/ZRBGo5m.jpeg",
        "https://i.imgur.com/S7sYx7j.jpeg",
        "https://i.imgur.com/Ck5UDZs.jpeg",
        "https://i.imgur.com/shRXeXp.jpeg",
        "https://i.imgur.com/d0e4Gg0.jpeg",
        "https://i.imgur.com/XmuoNT6.jpeg",
        "https://i.imgur.com/8vMlinn.jpeg",
        "https://i.imgur.com/zvGT7Oa.jpeg",
        "https://i.imgur.com/ccZdRHB.jpeg",
        "https://i.imgur.com/8l4WW9G.jpeg",
        "https://i.imgur.com/D2Buzzx.jpeg",
        "https://i.imgur.com/if12BWp.jpeg",
        "https://i.imgur.com/vQvnMKM.jpeg",
        "https://i.imgur.com/6ZLVn3c.jpeg",
        "https://i.imgur.com/aivDfal.jpeg",
        "https://i.imgur.com/Ci1DJ1U.jpeg",
        "blob:https://imgur.com/1b8b2679-1366-4be7-a6b5-60f815f46c8a",
        "blob:https://imgur.com/569b5790-0990-4405-ad2b-45bb85f201fc",
        "blob:https://imgur.com/1fd2e8d0-7fc4-49fe-9e67-0dc45265c990",
        "https://i.imgur.com/oq1NFz2.jpeg",
        "https://i.imgur.com/Ra5WE6i.jpeg",
        "blob:https://imgur.com/c52c4c09-9c13-4cd4-876f-b95cd9ac910c",
    ],

};

export default function Gallery() {
    const { type } = useParams();
    const images = imageGroups[type] || [];

    return (
        <>
            <br />
            <div className="section-header">
                <h2>Галерия</h2>
                <p>Това са снимки от нашия хотел и нашата механа.</p>
            </div>

            <nav className="galleryNav">
                <Link to="/guestHouseImages">Хотел</Link>
                <Link to="/spa">Спа</Link>
                <Link to="/mehana">Механа</Link>
                <Link to="/menu">Меню</Link>
            </nav>

            <AmenitiesItem images={images} />
        </>
    );
}
