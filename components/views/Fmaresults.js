export default st => `
<div class="addOrImage" style="display: none;"></div>

<main id="fmaSearchPage">
    <div class="pageIntro">
        <p>With the <b>STIX FMA Fun Finder</b> you can now find the FMA venues and events you're looking for! Refine your search results by selecting additional options from the search bar, and then clicking the search button. Results are listed in order, from the closest to the furthest venue from your zip code.</p>
    </div>

    <form id="searchBar" class="searchBar">
        <div>
            <input type="text" name="Zip" id="zipSearch" class="sbField" placeholder="Zip Code" value="${st.zipCode}" required>
        </div>

        <div>
            <select id="radiusSearch" name="radius" class="sbField" value="${st.radius}" required>
            <option disabled selected value="Radius">Radius</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
        </div>
        <div>
            <select id="typeSearch" name="type" class="sbField" value="${st.type}">
            <option disabled selected value="Type">Type</option>
            <option value="Club">Club</option>
            <option value="Group">Group</option>
            <option value="School">School</option>
            <option value="Event">Event</option>
            <option value="All">All</option>
            </select>
        </div>
        <div>
            <select id="styleSearch" name="style" class="sbField" value="${st.style}">
            <option disabled selected value="Style">Style</option>
            <option value="Arnis">Arnis</option>
            <option value="Escrima">Escrima</option>
            <option value="Kali">Kali</option>
            <option value="All">All</option>
            </select>
        </div>
        <div >
            <button type="submit" id="btnFilterSearch" class="btnStyled">Search</button>
        </div>
    </form>

    <div id="results" class="center">
        <h3></h3>
    </div>

    <div id="container" class="container">
        <div id="searchMessage">
            <h5>How to search</h2>
            <p>To search, enter a zip code and a radius, then click the search button for quick easy results.</p>
            <p>To make your search more specific, choose search options from the drop-down menus and click the search button.</p>
            <p>Results will be displayed in this area. Results are listed in order, from the closest to the furthest venue from your zip code.Scroll down to see all the results.</p>
        </div>
    </div>

    <div id="hpAddInfoButton" class="addInfo" style="display: none;"></div>
</main>
`;

// <div>
// <select id="stateSearch" name="state" class="sbField" value="${st.stateCode}">
// <option disabled selected value="State">State</option>
// <option value="AL">Alabama</option>
// <option value="AK">Alaska</option>
// <option value="AZ">Arizona</option>
// <option value="AR">Arkansas</option>
// <option value="CA">California</option>
// <option value="CO">Colorado</option>
// <option value="CT">Connecticut</option>
// <option value="DE">Delaware</option>
// <option value="DC">District Of Columbia</option>
// <option value="FL">Florida</option>
// <option value="GA">Georgia</option>
// <option value="HI">Hawaii</option>
// <option value="ID">Idaho</option>
// <option value="IL">Illinois</option>
// <option value="IN">Indiana</option>
// <option value="IA">Iowa</option>
// <option value="KS">Kansas</option>
// <option value="KY">Kentucky</option>
// <option value="LA">Louisiana</option>
// <option value="ME">Maine</option>
// <option value="MD">Maryland</option>
// <option value="MA">Massachusetts</option>
// <option value="MI">Michigan</option>
// <option value="MN">Minnesota</option>
// <option value="MS">Mississippi</option>
// <option value="MO">Missouri</option>
// <option value="MT">Montana</option>
// <option value="NE">Nebraska</option>
// <option value="NV">Nevada</option>
// <option value="NH">New Hampshire</option>
// <option value="NJ">New Jersey</option>
// <option value="NM">New Mexico</option>
// <option value="NY">New York</option>
// <option value="NC">North Carolina</option>
// <option value="ND">North Dakota</option>
// <option value="OH">Ohio</option>
// <option value="OK">Oklahoma</option>
// <option value="OR">Oregon</option>
// <option value="PA">Pennsylvania</option>
// <option value="RI">Rhode Island</option>
// <option value="SC">South Carolina</option>
// <option value="SD">South Dakota</option>
// <option value="TN">Tennessee</option>
// <option value="TX">Texas</option>
// <option value="UT">Utah</option>
// <option value="VT">Vermont</option>
// <option value="VA">Virginia</option>
// <option value="WA">Washington</option>
// <option value="WV">West Virginia</option>
// <option value="WI">Wisconsin</option>
// <option value="WY">Wyoming</option>
// </select>
// </div>
