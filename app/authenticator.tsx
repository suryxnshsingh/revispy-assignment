"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Authenticator = (WrappedComponent: any) => {
    const AuthenticatedComponent = (props: any) => {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === "loading") return; // Do nothing while loading
            if (!session) router.push("/auth/signin"); // Redirect if not authenticated
        }, [session, status, router]);

        if (status === "loading") return <div>Loading...</div>; // Show loading state

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default Authenticator;
