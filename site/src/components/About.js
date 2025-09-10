export default function About() {
    return (
        <div id="about">
            <div className="container">
                <div className="section-header">
                    <h2>За нас</h2>
                    <p>
                        Две традиционни Kопривщенски къщи, разположени една до друга в самия център на града до сградата на общината. Капацитет - 36 легла в стаи за двама и трима, апартамент. Стаите са със собствен санитарен възел, телевизор, Wi-Fi интернет.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6 img-cols">
                        <div className="img-col">
                            <img className="img-fluid" src="/img/bigfotos3.jpg" />
                        </div>
                    </div>
                    <div className="col-md-6 content-cols">
                        <div className="content-col">
                            <h3>Къде ще ни намерите?</h3>
                            <p>
                                Сградите са новопостроени с централно парно отопление, на 10 м. от най- слънчевия градски парк с детска площадка.
                                Хотелът се намира на адрес: ул. Любен Каравелов 22, а механата - бул. Хаджи Ненчо Палавеев 76, Копривщица.
                            </p>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-6 img-cols d-block d-md-none">
                        <div className="img-col">
                            <img className="img-fluid" src="https://i.imgur.com/pq3GuHV.jpeg" />
                        </div>
                    </div>
                    <div className="col-md-6 content-cols">
                        <div className="content-col">
                            <h3>Нашите предложения</h3>
                            <p>
                                На разположение на гостите в хотела са: ресторант с българска кухня, релакс център с вътрешен басейн, джакузи, инфрачервена сауна и масажен салон. В слънчевия двор се намира външен сезонен басейн с размери 8/4/1.2 м и температура на водата 30°C.
                                Освен това, в отделна локация, гостите могат да посетят и традиционната механа "Под старата круша", която предлага автентична българска атмосфера и домашно приготвени ястия.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 img-cols d-none d-md-block">
                        <div className="img-col">
                            <img className="img-fluid" src="https://i.imgur.com/pq3GuHV.jpeg" />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-6 img-cols">
                        <div className="img-col">
                            <img className="img-fluid" src="https://i.imgur.com/ML06ePU.jpeg" />
                        </div>
                    </div>
                    <div className="col-md-6 content-cols">
                        <div className="content-col">
                            <h3>За кого са подходящи хотелът и механата?</h3>
                            <p>
                                Хотелът е подходящ за провеждане на зелени училища, семинари, стажове, фирмени и тийм билдинг празненства. Механата е подходяща за семпли традиционни вечери, специални събития, вечери със семейството или фирмени събирания.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}