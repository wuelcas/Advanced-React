import PleaseSignIn from "../components/PleaseSignIn";
import Permissions from "../components/Permissions";

export default class PermissionsPage extends React.Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <Permissions />
        </PleaseSignIn>
      </div>
    );
  }
}
