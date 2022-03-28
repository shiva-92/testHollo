import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "../styles/_app.scss";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    //if the state darkmode takes true, we add "dark-mode" as a className to the root html element
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    }
    //else, we remove "dark-mode" as a className from the root html element
    else {
      document.documentElement.classList.remove("dark-mode");
    }
    //darkMode as depency of the useEffect to trigger action when the value of the state changes
  }, [darkMode]);

  return (
    <div className="app">
      <div className="level">
        <div>
          <h1 className="title">Dark Mode Challenge</h1>
        </div>

        {/* --The button that should toggle dark mode-- */}

        <button className="app__dark-mode-btn icon level-right">
          <FontAwesomeIcon
            //ternary : if state darkMode takes true, icon takes faMoon, otherwise icon takes faSun
            icon={darkMode ? faSun : faMoon}
            color={darkMode && "#FFA500"}
            onClick={() => {
              //on click on the button, we change the current value of the state
              setDarkMode(!darkMode);
            }}
          />
        </button>
      </div>

      <div className="columns">
        <div className="column">
          <p>
            Lollipop powder powder. Cotton candy caramels chupa chups halvah
            muffin caramels apple pie topping cake. Topping chocolate bar pastry
            chocolate cake. Cupcake tart jujubes dragée jelly-o icing sugar
            plum. Chocolate bar lollipop candy canes. Biscuit croissant apple
            pie pudding caramels wafer tart tootsie roll macaroon. Croissant
            tiramisu chocolate bar carrot cake lemon drops halvah.
          </p>
        </div>
        <div className="column">
          <p>
            Marshmallow tiramisu liquorice bear claw chocolate bar bear claw
            tart. Muffin chupa chups pie. Brownie apple pie topping lemon drops
            marzipan toffee. Pudding macaroon icing ice cream bonbon cake tart.
            Pudding sugar plum chocolate cake cake biscuit pastry pastry
            chocolate bar tart. Lemon drops dessert gummies icing.
          </p>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Name" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Email" />
        </div>
      </div>

      <section className="section">
        <div className="buttons level-right">
          <a className="button is-primary">Save</a>
          <a className="button is-link">Submit</a>
        </div>
      </section>
    </div>
  );
}

export default App;
