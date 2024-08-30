import React from "react";
import { projectPhoto6, projectPhoto2 } from "../../../img/Projects";

function MainScreen() {
  return (
    <div className="main-screen">
        <div className="container main-container">
            <div className="main-screen-content">
              <h2>Пропозиції для вас</h2>
              <div className="main-screen-cards">
                <div className="main-screen-card">
                  <div className="main-screen-card-img">
                    <img src={projectPhoto6} alt="Вірую, обіцяю" />
                  </div>
                  <a href="https://onovlennia.com.ua/courses/viruyu-obitsyayu/" target="_blank" rel="noreferrer">Відкрити</a>
                </div>
                <div className="main-screen-card">
                  <div className="main-screen-card-img">
                    <img src={projectPhoto2} alt="Менахем" />
                  </div>
                  <a href="https://onovlennia.com.ua/" target="_blank" rel="noreferrer">Відкрити</a>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default MainScreen;
