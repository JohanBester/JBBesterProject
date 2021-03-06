export default () => `
<main>
    <div class="addOrImage"></div>

    <div id="registerPage" class="mainBody">
        <div class="pageIntro">
            <h1>Register a New User Account</h1>
        </div>

        <p>To setup a new user account, please chose a user name, enter your email address, and set a password.
            The user name must be at least 8 characters long, with a maximum of 25 characters.<br />
            <b>Passwords must be at least 8 characters long, and no more than 25 characters.</br>
            It is recommended to use upper and lower case characters, numbers and special characters in your password.
        </p>

        <form id="signup-form" action="" method="POST">
            <div class="form-group right">
                <label id="firstname-label" for="firstname">First Name <span class="required">*</span></label>
                <input type="text" name="firstname" id="firstname" class="form-control" placeholder="Enter your first name" required>
            </div>

            <div class="form-group right">
                <label id="lastname-label" for="lastname">Last Name <span class="required">*</span></label>
                <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Enter your last name" required>
            </div>

            <div class="form-group right">
                <label id="name-label" for="username">User Name <span class="required">*</span></label>
                <input type="text" name="name" id="username" class="form-control" placeholder="Enter your user name" minlength="8" maxlength="25" required>
            </div>

            <div class="form-group right">
                <label id="email-label" for="email">Email <span class="required">*</span></label>
                <input type="email" name="email" id="useremail" class="form-control" placeholder="Enter your email address" required>
            </div>

            <div class="form-group right">
                <label id="password-label1" for="password1">Enter Password <span class="required">*</span></label>
                <input type="password" name="password1" id="password1" class="form-control" placeholder="Enter your password" minlength="8" maxlength="25" required>
            </div>

            <div class="form-group right">
                <label id="password-label2" for="password2">Confirm Password <span class="required">*</span></label>
                <input type="password" name="password2" id="password2" class="form-control" placeholder="Re-enter your password" minlength="8" maxlength="25" required>
            </div>

            <div class="form-group">
                <button type="reset" id="clear" class="btnStyled submit-button" onclick="form.reset()">Clear</button>
                <button type="submit" id="register" class="btnStyled submit-button">Register</button>
            </div>
        </form>
        <br/>

        <div id="hpAddInfoButton" class="addInfo" style="display: none;"></div>
        <br/>

    </div>
</main>
`;
