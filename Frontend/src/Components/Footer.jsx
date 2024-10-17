import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="dark" className="text-center text-lg-start text-white">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Síguenos en nuestras redes:</span>
        </div>

        <div>
          <a
            href="https://www.facebook.com/lauty.molina.547/?locale=es_LA"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="facebook-f" />
          </a>
          <a href="https://x.com/Becco_Masuero" className="me-4 text-reset">
            <MDBIcon color="white" fab icon="twitter" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon color="white" fab icon="google" />
          </a>
          <a
            href="https://www.instagram.com/https.danny_inthe_cosmos/"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="instagram" />
          </a>
          <a
            href="https://www.linkedin.com/in/lautaro-daniel-molina-3782b1203/"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="linkedin" />
          </a>
          <a
            href="https://labsys.frc.utn.edu.ar/gitlab/desarrollo-de-software1/proyectos2024/3k7/tp-e01-3k07-89510.git"
            className="me-4 text-reset"
          >
            <MDBIcon color="white" fab icon="github" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon color="white" icon="gem" className="me-3" />
                Duckling
              </h6>
              <p>
                En Duckling CO. nos interesa brindar un servicio de streaming de
                calidad y accesible para todos los hogares.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Tecnologias</h6>
              <p>
                <a href="https://es.react.dev/" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="https://vitejs.dev/" className="text-reset">
                  Vite
                </a>
              </p>
              <p>
                <a href="https://www.java.com/es/" className="text-reset">
                  JavaScript
                </a>
              </p>
              <p>
                <a
                  href="https://react-bootstrap.netlify.app/docs/forms/select/"
                  className="text-reset"
                >
                  Boostrap
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contactanos</h6>
              <p>
                <MDBIcon color="white" icon="home" className="me-2" />
                La Calera, VD 10012, ARG
              </p>
              <p>
                <a href="mailto:lautyy1210@gmail.com" className="text-reset">
                  <MDBIcon color="white" icon="envelope" className="me-3" />
                  lautyy1210@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+5493517050421" className="text-reset">
                  <MDBIcon color="white" icon="phone" className="me-3" /> +54 9
                  351 705-0421
                </a>
              </p>
              <p>
                <MDBIcon color="white" icon="print" className="me-3" /> + 01 234
                567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className="text-reset fw-bold" href="https://duckling.com/">
          Duckling.com
        </a>
      </div>
    </MDBFooter>
  );
}
