export default function Home() {
    return (
        <div>
            <div className="flex items-center justify-end p-4 z-[100] w-full absolute">
                <button className="p-2">Login</button>
                <button className="p-2">Signup</button>
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {/* login, signup buttons */}
                
                {/* username displays on the top if logged in */}
                My Video Games List
            </main>
        </div>
    );
}
