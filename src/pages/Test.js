import useAuth from "../hooks/user-auth";
const Test = () => {
    const {user} = useAuth()
    return ( 
        <div>
            hey {user.displayName}
        </div>
     );
}
 
export default Test;