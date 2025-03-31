import {useAppSelector} from "../../app/hooks.ts";
import BreadProductAdmin from "../BreadProductAdmin.tsx";
import BreadProductUser from "../BreadProductUser.tsx";
import {Roles} from "../../utils/types-bakery-shop.ts";

const Bread = () => {
    const {role} = useAppSelector(state => state.auth);

    if (role === Roles.ADMIN) {
        return <BreadProductAdmin />;
    }

    return <BreadProductUser />;
};

export default Bread;
