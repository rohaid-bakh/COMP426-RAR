$("h1.title").after("<h1>Wow</h1>");
$("section.content#1").after(`
<form>
                    <div class="field control">
                        <label class=label>
                    Email
                </label>
                        <input class="input" type="email" placeholder="Email">
                    </div>
                    <label class=label>
                Password
            </label>
                    <div class="field control">
                        <input class="input" type="password" placeholder="Password">
                    </div>
                    <div class="field  has-text-centered">
                        <div>
                            <input class="button  is-success is-inverted" type="submit" value="Log In">
                            <a href = "profilesetup/profilesetup.html" class="button  is-success is-inverted" type="submit" value="Sign up">Sign up</a>
                        </div>
                        <p class="subtitle is-gray is-marginless">
                            Forget your password?
                        </p>
                    </div>

                    <container class="has-text-centered">
                        <p class="subtitle is-gray is-marginless">
                            Continue with?
                            <div class="field is-paddingless">
                                <button class="button is-primary">
                                <span class="icon">
                                  <i class="fab fa-twitter"></i>
                                </span>
                                <span>Twitter</span>
                              </button>
                                <button class="button is-primary">
                                    <span class="icon">
                                      <i class="fab fa-facebook-square"></i>
                                    </span>
                                    <span>Facebook</span>
                                  </button>
                                <button class="button is-primary">
                                        <span class="icon">
                                          <i class="fab fa-tumblr"></i>
                                        </span>
                                        <span>Tumblr</span>
                                      </button>
                            </div>
                    </container>
                </form>
                `);