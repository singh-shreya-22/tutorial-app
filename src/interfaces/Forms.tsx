interface AuthForm  {
    name: string;
    email: string;
    password: string;
}
interface MealForm {
    name: string;
    quantity: string;
    unit: string;
    tag: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}
interface Tab {
    id: string;
    label: string;
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}
export type {AuthForm, MealForm, Tab};