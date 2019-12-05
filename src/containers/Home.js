import React from "react";
import { Container, Header, Image } from "semantic-ui-react";
import Layout from "./layout";
import android from "./android.png";
const Home = ({ children }) => (
  <Layout>
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Senresto</Header>
      <p>
        Senyobante propose la livraison à domicile de repas 🥘, boissons 🍾,
        desserts 🍩 et gâteaux 🍰. Commandez et faites-vous livrer vos plats en
        provenances des meilleurs restaurants près de chez vous. Suivez votre
        livreur en temps réel
      </p>

      <a
        href="https://play.google.com/store/apps/details?id=com.senyobante"
        target="_blank"
      >
        <Image src={android} style={{ marginTop: "2em" }} />
      </a>
      {/* 
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} />
      <Image src={logo} style={{ marginTop: "2em" }} /> */}
    </Container>
  </Layout>
);

export default Home;
