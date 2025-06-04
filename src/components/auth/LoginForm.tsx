//components
import { CardWrapper as Card } from "@/components/auth/Card";

export const LoginForm = () => {
    return (
        <div className="flex h-full items-center justify-center p-4 sm:p-6">
            <Card>
                <h1 className="font-poppins font-bold text-lg">Sign into your account</h1>
            </Card>
        </div>
    );
};
