import { SEO } from "@/components";
import "./AboutUs.scss";

export const AboutUs = () => {
  return (
    <section id="aboutus" className="about-us">
      <SEO
        title="O nama"
        description="Saznajte više o Avala Home Concept — luksuzne kuće modernog dizajna na Avalskoj planini, 20 minuta od Beograda."
        path="/about-us"
      />
      <div className="about-us__right">
        <h1 className="about-us__title">O nama</h1>
        <p>
          Dobrodošli u Avala Home Concept - vašu destinaciju za udobniji,
          kvalitetniji i zdraviji način života na prelepom području Avalske
          planine, nadomak Beograda. Naša misija je pružiti vam luksuzne kuće
          modernog dizajna koje će ispuniti sve vaše potrebe i omogućiti vam da
          uživate u životu okruženi predivnom prirodom.
        </p>
        <p>
          Svaka kuća iz naše Avala Home Concept ponude pažljivo je osmišljena i
          izgrađena kako bi pružila maksimalan komfor i udobnost višečlanim
          porodicama. Naš tim stručnjaka radi sa strašću i posvećenošću kako bi
          svaka kuća bila izvanredno dizajnirana i opremljena najkvalitetnijim
          materijalima. Svaki detalj je pažljivo osmišljen kako bi stvorio
          harmoniju između enterijera i eksterijera, stvarajući prijatno
          okruženje za vas i vašu porodicu.
        </p>
        <p>
          Nalazimo se na prelepom delu sa pogledom na veličanstveni Avalski
          toranj, pružajući vam privilegiju da svakog dana uživate u predivnom
          pejzažu i osećate mir i spokoj koji dolazi sa životom u prirodi. Naše
          kuće su koncipirane tako da vam pruže privatnost i intimnost, dok
          istovremeno omogućavaju lako povezivanje sa lokalnom zajednicom i svim
          pogodnostima koje grad pruža.
        </p>
        <p>
          Verujemo u važnost zdravog načina života, stoga smo se pobrinuli da
          naše kuće budu energetski efikasne i održive. Koristimo napredne
          tehnologije i ekološki prihvatljive materijale kako bismo smanjili
          ekološki otisak i pružili vam prostor u kojem možete živeti sa svesti
          o važnosti očuvanja prirode.
        </p>
        <p>
          Naš stručni tim vam stoji na raspolaganju da vam pruži sve potrebne
          informacije i podršku tokom celog procesa. Naš cilj je da vam
          omogućimo ne samo kuću, već i dom u kojem ćete stvoriti neprocenjive
          uspomene i uživati u svakom trenutku.
        </p>
        <p>
          Avala Home Concept - vaša adresa za luksuzni život u skladu sa
          prirodom. Očekujemo vas sa otvorenim rukama kako bismo zajedno
          ostvarili vaše snove o idealnom domu.
        </p>
      </div>
    </section>
  );
};
