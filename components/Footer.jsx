const Footer = () => {
    return (
        <footer className="mt-20 bg-gray-950 text-white">

            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">

                {/* About */}
                <div>
                    <h3 className="mb-4 text-xl font-bold">
                        JobPortal
                    </h3>

                    <p className="max-w-sm text-sm leading-7 text-gray-400">
                        Find your dream job and connect with companies
                        that match your skills and career goals.
                    </p>
                </div>

                {/* Job Seekers */}
                <div>
                    <h4 className="mb-4 font-semibold">
                        For Job Seekers
                    </h4>

                    <div className="space-y-3 text-sm text-gray-400">
                        <p className="cursor-pointer hover:text-white">
                            Browse Jobs
                        </p>

                        <p className="cursor-pointer hover:text-white">
                            Saved Jobs
                        </p>

                        <p className="cursor-pointer hover:text-white">
                            Applications
                        </p>

                        <p className="cursor-pointer hover:text-white">
                            Resume
                        </p>
                    </div>
                </div>

                {/* Employers */}
                <div>
                    <h4 className="mb-4 font-semibold">
                        For Employers
                    </h4>

                    <div className="space-y-3 text-sm text-gray-400">
                        <p className="cursor-pointer hover:text-white">
                            Post a Job
                        </p>

                        <p className="cursor-pointer hover:text-white">
                            Manage Jobs
                        </p>

                        <p className="cursor-pointer hover:text-white">
                            Applicants
                        </p>

                        <p className="cursor-pointer hover:text-white">
                            Company Profile
                        </p>
                    </div>
                </div>

            </div>

            <div className="border-t border-gray-800 px-4 py-5 text-center text-sm text-gray-500">
                © 2026 JobPortal. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;