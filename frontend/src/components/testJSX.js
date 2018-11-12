export default {
  functional: true,
  render(createElement, {children}) {
    console.log('a')
    return (
      <div class="text-xs-center">
        {children}
       </div>
    );
  }
};

/*
export default {
  data: () => ({
    dialog: false
  }),
  // functional: true,
  render(createElement, context) {
    return (
      <div class="text-xs-center">
        <v-btn onClick={() => (this.dialog = true)} color="red lighten-2" dark>
          Click Me
        </v-btn>
        {this.dialog ? (
          <v-dialog value={true} width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                Privacy Policy
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  flat
                  onClick={() => (this.dialog = false)}
                >
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        ) : (
          ""
        )}
      </div>
    );
  }
};

*/
