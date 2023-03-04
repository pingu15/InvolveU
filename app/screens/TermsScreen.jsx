import React from "react";
import { View, Text } from "react-native";

/**
 * Screen displays the terms and privacy policy of the app.
 * 
 * @returns {JSX.Element} The terms screens
 */
export default function TermsScreen() {
  return (
    <View style={{ margin: "5%" }}>
      <Text>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. InvolveU
        collects, uses, maintains, and discloses information collected from
        users (each, a "User") of the App.{`\n`}
      </Text>
      <Text>
        This Privacy Policy applies to the App and all products and services
        offered by InvolveU. The Developer employs industry-standard security
        measures to protect User information from unauthorized access,
        disclosure, alteration, or destruction.The App is not intended for use
        by children under the age of 13. The Developer does not knowingly
        collect or solicit personal information from children under 13. If the
        Developer becomes aware that personal information has been collected
        from a child under 13 without parental consent, the Developer will take
        reasonable steps to delete that information. The Developer may update
        this Privacy Policy at any time. The updated policy will be posted on
        the App and the Developer's website. Users are encouraged to review this
        Privacy Policy periodically to stay informed about how the Developer is
        protecting User information.{`\n`}
      </Text>
      <Text>
        If Users have any questions or concerns about this Privacy Policy or the
        App's privacy practices, they may contact the Developers at
        maxsun715@gmail.com.
      </Text>
    </View>
  );
}
