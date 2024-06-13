
export const validateRecipeInputData = (type: string, value: string | number): boolean => {
    if (!type || !value) {
        return false;
    }

    switch (type) {
        case 'imageUrl': {
            const match = String(value)
                .toLowerCase()
                .match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp)/g);
            return !!(match?.length);
        }
        case 'title': {
            const match = String(value)
                .toLowerCase()
                .match(/^(?=.{6,30}$)[A-Z a-z]+(?: [A-Z a-z]+)*$/g);
            return !!(match?.length);
        }
        case 'type': {
            return true;
        }
        case 'prepTime': {
            const prepTime = Number(value);
            if (!isNaN(prepTime) && prepTime > 0) {
                return true;
            }
            return false;
        }
        case 'cookingTime': {
            const cookingTime = Number(value);
            if (!isNaN(cookingTime) && cookingTime > 0) {
                return true;
            }
            return false;
        }
        case 'servings': {
            const servings = Number(value);
            if (!isNaN(servings) && servings > 0) {
                return true;
            }
            return false;
        }
        case 'ingredients': {
            const match = String(value)
                .toLowerCase()
                .match(/^(?=.{3,200}$)[A-Za-z0-9,.\s⁄½⅓⅔¼¾⅛⅜⅝⅞]*$/g);
            return !!(match?.length);
        }
        case 'description': {
            const match = String(value)
                .toLowerCase()
                .match(/^(?=.{6,1000}$)([A-Za-z0-9,.:;!'’\- \n]*)$/m);
            return !!(match?.length);
        }
        default:
            return false;
    }
}
