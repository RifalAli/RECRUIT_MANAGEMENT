<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MainJob>
 */
class MainJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jobCategoryMap = [
            'Software Development' => ['Junior Developer', 'Senior Developer', 'Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'DevOps Engineer'],
            'Data Science' => ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst', 'AI Researcher'],
            'Network Administration' => ['Network Administrator', 'System Administrator', 'Network Engineer', 'IT Support Specialist'],
            'Cyber Security' => ['Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester', 'Information Security Officer'],
            'Healthcare Management' => ['Healthcare Manager', 'Clinical Manager', 'Hospital Administrator', 'Health Services Manager'],
            'Nursing' => ['Registered Nurse', 'Nurse Practitioner', 'Clinical Nurse Specialist', 'Pediatric Nurse'],
            'Accounting' => ['Accountant', 'Financial Auditor', 'Tax Specialist'],
            'Financial Analysis' => ['Financial Analyst', 'Investment Analyst', 'Risk Analyst', 'Budget Analyst'],
            'Marketing' => ['Digital Marketing Specialist', 'SEO Specialist', 'Content Marketer', 'Brand Manager'],
            'Sales' => ['Sales Executive', 'Account Manager', 'Business Development Representative', 'Sales Consultant'],
            'Human Resource' => ['HR Manager', 'Recruiter', 'HR Coordinator', 'Talent Acquisition Specialist'],
            'Civil Engineering' => ['Civil Engineer', 'Structural Engineer', 'Construction Manager', 'Site Engineer'],
            'Electrical Engineering' => ['Electrical Engineer', 'Power Systems Engineer', 'Control Systems Engineer', 'Electronics Engineer'],
            'Mechanical Engineering' => ['Mechanical Engineer', 'Design Engineer', 'Product Engineer', 'Manufacturing Engineer'],
            'Architecture' => ['Architect', 'Urban Planner', 'Interior Designer', 'Landscape Architect'],
            'Customer Service' => ['Customer Service Representative', 'Customer Support Specialist', 'Call Center Agent', 'Client Services Coordinator'],
            'Supply Chain Management' => ['Supply Chain Manager', 'Logistics Coordinator', 'Procurement Specialist', 'Inventory Manager'],
            'Education and Teaching' => ['Elementary School Teacher', 'High School Teacher', 'Instructional Coordinator', 'Special Education Teacher'],
            'Project Management' => ['Project Manager', 'Program Manager', 'Project Coordinator', 'Scrum Master'],
            'Business Analysis' => ['Business Analyst', 'Operations Analyst', 'Process Improvement Specialist', 'Business Consultant'],
            'Legal Services' => ['Lawyer', 'Paralegal', 'Legal Secretary', 'Legal Advisor'],
            'Retail Management' => ['Store Manager', 'Retail Supervisor', 'Inventory Manager', 'Sales Floor Manager'],
            'Hospitality and Tourism' => ['Hotel Manager', 'Tour Guide', 'Event Coordinator', 'Resort Manager'],
            'Event Planning' => ['Event Planner', 'Event Coordinator', 'Conference Manager', 'Wedding Planner'],
            'Real Estate' => ['Real Estate Agent', 'Property Manager', 'Real Estate Broker', 'Leasing Consultant'],
            'Media and Communications' => ['Communications Specialist', 'Content Writer', 'Public Relations Specialist', 'Media Planner'],
            'Transportation and Logistics' => ['Logistics Manager', 'Transport Coordinator', 'Supply Chain Analyst', 'Freight Forwarder'],
            'Manufacturing' => ['Production Supervisor', 'Manufacturing Engineer', 'Assembly Line Manager', 'Process Engineer'],
            'Quality Assurance' => ['QA Engineer', 'Quality Inspector', 'QA Specialist', 'Test Engineer'],
            'Software Testing' => ['Software Tester', 'Test Automation Engineer', 'QA Analyst', 'Performance Tester'],
            'Administrative Support' => ['Administrative Assistant', 'Office Manager', 'Executive Assistant', 'Receptionist'],
            'Operations Management' => ['Operations Manager', 'Operations Analyst', 'Plant Manager', 'Operations Supervisor'],
            'Public Relations' => ['PR Specialist', 'Public Affairs Manager', 'PR Coordinator', 'Communications Manager'],
            'Data Engineering' => ['Data Engineer', 'ETL Developer', 'Data Architect', 'Big Data Engineer'],
            'Machine Learning' => ['ML Engineer', 'AI Developer', 'Data Scientist', 'AI Researcher'],
            'Blockchain Development' => ['Blockchain Developer', 'Smart Contract Developer', 'Blockchain Architect', 'Cryptocurrency Developer'],
            'UX/UI Design' => ['UX Designer', 'UI Designer', 'Product Designer', 'Interaction Designer'],
            'Product Management' => ['Product Manager', 'Product Owner', 'Technical Product Manager', 'Associate Product Manager'],
            'Environmental Science' => ['Environmental Scientist', 'Ecologist', 'Conservation Scientist', 'Environmental Consultant'],
            'Game Development' => ['Game Developer', 'Game Designer', 'Level Designer', 'Gameplay Programmer'],
        ];

        $jobDescriptionMap = [
            'Software Development' => [
                'As a software developer, you will write clean, maintainable, and efficient code. You will collaborate with cross-functional teams to define, design, and ship new features.',
                'As a backend developer, you will focus on server-side logic and database management. You will work closely with the frontend team to ensure seamless integration.',
                'As a full stack developer, you will handle both frontend and backend tasks, ensuring a smooth and functional user experience.',
                'As a senior developer, you will lead projects and mentor junior developers. You will be responsible for architectural decisions and high-level design.',
            ],
            'Data Science' => [
                'As a data scientist, you will analyze large datasets to extract meaningful insights. You will use statistical techniques and machine learning models to solve business problems.',
                'As a machine learning engineer, you will develop algorithms that can learn from data and make predictions. You will work closely with data engineers to scale your models.',
            ],
            'Network Administration' => [
                'As a network administrator, you will manage and maintain network infrastructure. You will ensure network security, performance, and availability.',
                'As a system administrator, you will oversee server operations and configurations. You will troubleshoot issues and ensure system stability and security.',
            ],
            'Cyber Security' => [
                'As a cybersecurity analyst, you will monitor and protect our systems from cyber threats. You will conduct vulnerability assessments and respond to security incidents.',
                'As a security engineer, you will design and implement security measures to protect our IT infrastructure. You will stay up-to-date with the latest security trends and technologies.',
            ],
            'Healthcare Management' => [
                'As a healthcare manager, you will oversee the operations of a healthcare facility. You will ensure compliance with regulations and manage staff and resources.',
                'As a clinical manager, you will coordinate patient care and manage clinical staff. You will ensure the delivery of high-quality healthcare services.',
            ],
            'Nursing' => [
                'As a registered nurse, you will provide patient care and support. You will administer medications, monitor patient progress, and collaborate with healthcare teams.',
                'As a nurse practitioner, you will diagnose and treat medical conditions. You will perform physical exams and develop treatment plans for patients.',
            ],
            'Accounting' => [
                'As an accountant, you will manage financial records and prepare reports. You will ensure accuracy and compliance with accounting standards and regulations.',
                'As a financial auditor, you will review financial statements and transactions. You will assess the accuracy and integrity of financial reporting.',
            ],
            'Financial Analysis' => [
                'As a financial analyst, you will analyze financial data to provide insights and recommendations. You will help in budgeting, forecasting, and financial planning.',
                'As an investment analyst, you will research and evaluate investment opportunities. You will provide recommendations based on financial and market analysis.',
            ],
            'Marketing' => [
                'As a digital marketing specialist, you will develop and implement online marketing strategies. You will manage campaigns, analyze performance, and optimize for results.',
                'As a content marketer, you will create and distribute valuable content to attract and engage target audiences. You will work on content strategies and measure their effectiveness.',
            ],
            'Sales' => [
                'As a sales executive, you will generate leads, close sales, and manage client relationships. You will develop strategies to meet sales targets and drive business growth.',
                'As an account manager, you will maintain and grow client accounts. You will ensure client satisfaction and work on upselling and cross-selling opportunities.',
            ],
            'Human Resource' => [
                'As an HR manager, you will oversee recruitment, employee relations, and compliance. You will implement HR policies and manage employee performance and development.',
                'As a recruiter, you will source, interview, and hire candidates. You will work with hiring managers to understand job requirements and find the best talent.',
            ],
            'Civil Engineering' => [
                'As a civil engineer, you will design, develop, and oversee construction projects. You will ensure projects are completed on time, within budget, and to safety standards.',
                'As a structural engineer, you will analyze and design structures such as buildings and bridges. You will ensure their stability and safety under various loads.',
            ],
            'Electrical Engineering' => [
                'As an electrical engineer, you will design and develop electrical systems and components. You will work on power generation, transmission, and distribution systems.',
                'As a power systems engineer, you will focus on the design and optimization of electrical power systems. You will ensure reliable and efficient power delivery.',
            ],
            'Mechanical Engineering' => [
                'As a mechanical engineer, you will design, analyze, and manufacture mechanical systems and devices. You will work on product development and process improvements.',
                'As a manufacturing engineer, you will focus on improving manufacturing processes and systems. You will ensure product quality and efficiency in production.',
            ],
            'Architecture' => [
                'As an architect, you will design and plan buildings and structures. You will work on creating functional and aesthetically pleasing designs while ensuring regulatory compliance.',
                'As an urban planner, you will develop plans for land use and community development. You will work on zoning, infrastructure, and environmental considerations.',
            ],
            'Customer Service' => [
                'As a customer service representative, you will assist customers with inquiries, complaints, and product support. You will provide excellent service and resolve issues promptly.',
                'As a client services coordinator, you will manage client interactions and ensure their needs are met. You will handle client feedback and work to improve service quality.',
            ],
            'Supply Chain Management' => [
                'As a supply chain manager, you will oversee and optimize the supply chain process. You will manage logistics, procurement, and inventory to ensure efficient operations.',
                'As a procurement specialist, you will handle sourcing and purchasing of goods and services. You will negotiate with suppliers and ensure cost-effectiveness.',
            ],
            'Education and Teaching' => [
                'As an elementary school teacher, you will educate and support young students. You will develop lesson plans, teach various subjects, and manage classroom activities.',
                'As a high school teacher, you will specialize in teaching a particular subject area. You will prepare students for higher education or vocational training.',
            ],
            'Project Management' => [
                'As a project manager, you will plan, execute, and oversee projects. You will manage resources, budgets, and timelines to ensure successful project delivery.',
                'As a program manager, you will coordinate multiple projects and ensure they align with organizational goals. You will manage interdependencies and resources across projects.',
            ],
            'Business Analysis' => [
                'As a business analyst, you will assess business needs and requirements. You will work on improving processes, implementing solutions, and analyzing performance metrics.',
                'As an operations analyst, you will evaluate business operations and identify areas for improvement. You will work on process optimization and efficiency enhancements.',
            ],
            'Legal Services' => [
                'As a lawyer, you will provide legal advice and representation. You will handle cases, draft legal documents, and advocate on behalf of clients in legal matters.',
                'As a paralegal, you will assist lawyers with legal research, documentation, and case preparation. You will handle administrative tasks and support legal proceedings.',
            ],
            'Retail Management' => [
                'As a store manager, you will oversee daily operations and staff management in a retail environment. You will ensure customer satisfaction and meet sales targets.',
                'As a retail supervisor, you will support store operations and assist in managing staff. You will ensure adherence to store policies and customer service standards.',
            ],
            'Hospitality and Tourism' => [
                'As a hotel manager, you will oversee hotel operations, guest services, and staff management. You will ensure a high level of guest satisfaction and operational efficiency.',
                'As a tour guide, you will lead and inform visitors during tours. You will provide engaging and educational experiences about various locations and attractions.',
            ],
            'Event Planning' => [
                'As an event planner, you will coordinate and execute events such as weddings, corporate functions, and parties. You will handle logistics, vendor management, and client interactions.',
                'As a conference manager, you will plan and organize conferences and large-scale events. You will manage schedules, speakers, and venue arrangements to ensure successful events.',
            ],
            'Real Estate' => [
                'As a real estate agent, you will assist clients in buying, selling, or renting properties. You will provide market analysis, negotiate deals, and manage property listings.',
                'As a property manager, you will oversee the operation and maintenance of rental properties. You will handle tenant relations, lease agreements, and property maintenance.',
            ],
            'Media and Communications' => [
                'As a communications specialist, you will manage internal and external communications. You will develop messaging strategies and handle media relations.',
                'As a content writer, you will create engaging content for various platforms. You will write articles, blog posts, and marketing materials to attract and retain audiences.',
            ],
            'Transportation and Logistics' => [
                'As a logistics manager, you will oversee the movement of goods and materials. You will manage transportation, warehousing, and inventory to ensure efficient operations.',
                'As a transport coordinator, you will plan and coordinate transportation activities. You will manage schedules, routes, and logistics to optimize delivery processes.',
            ],
            'Manufacturing' => [
                'As a production supervisor, you will oversee manufacturing processes and staff. You will ensure production targets are met and maintain quality standards.',
                'As a process engineer, you will analyze and optimize manufacturing processes. You will work on improving efficiency, reducing waste, and implementing new technologies.',
            ],
            'Quality Assurance' => [
                'As a QA engineer, you will design and execute test plans to ensure product quality. You will identify defects and work with development teams to resolve issues.',
                'As a quality inspector, you will examine products and processes to ensure they meet quality standards. You will document findings and recommend improvements.',
            ],
            'Software Testing' => [
                'As a software tester, you will conduct tests to ensure software functionality and performance. You will report bugs and work with developers to fix issues.',
                'As a test automation engineer, you will develop automated test scripts to streamline the testing process. You will ensure software quality through efficient and repeatable tests.',
            ],
            'Administrative Support' => [
                'As an administrative assistant, you will provide office support and manage administrative tasks. You will handle scheduling, correspondence, and document management.',
                'As an office manager, you will oversee office operations and manage support staff. You will ensure a productive work environment and handle administrative functions.',
            ],
            'Operations Management' => [
                'As an operations manager, you will oversee day-to-day operations and improve processes. You will manage resources, budgets, and ensure operational efficiency.',
                'As a plant manager, you will supervise manufacturing plant operations. You will ensure production goals are met and maintain safety and quality standards.',
            ],
            'Public Relations' => [
                'As a PR specialist, you will manage public relations campaigns and media communications. You will craft press releases, handle media inquiries, and build positive relationships.',
                'As a public affairs manager, you will oversee communication strategies and manage relationships with stakeholders. You will work on advocacy and public policy initiatives.',
            ],
            'Data Engineering' => [
                'As a data engineer, you will design and build data pipelines and infrastructure. You will ensure data quality and accessibility for analytics and business intelligence.',
                'As an ETL developer, you will develop and manage ETL processes for data integration. You will work on data extraction, transformation, and loading to support analytics.',
            ],
            'Machine Learning' => [
                'As a machine learning engineer, you will develop and implement machine learning models. You will work on data processing, model training, and performance evaluation.',
                'As an AI developer, you will create artificial intelligence applications and systems. You will focus on implementing algorithms and integrating AI solutions into products.',
            ],
            'Blockchain Development' => [
                'As a blockchain developer, you will design and build blockchain applications. You will work on smart contracts, consensus algorithms, and distributed ledger technologies.',
                'As a smart contract developer, you will create and deploy smart contracts on blockchain platforms. You will ensure their security and functionality in decentralized applications.',
            ],
            'UX/UI Design' => [
                'As a UX designer, you will research and design user experiences for digital products. You will focus on usability, user research, and interaction design.',
                'As a UI designer, you will create visually appealing user interfaces for applications. You will work on layout, graphics, and visual elements to enhance user engagement.',
            ],
            'Product Management' => [
                'As a product manager, you will define product vision and strategy. You will manage product development, gather customer feedback, and ensure product success.',
                'As a product owner, you will prioritize product features and requirements. You will work with development teams to deliver high-quality products on time.',
            ],
            'Environmental Science' => [
                'As an environmental scientist, you will study environmental processes and impacts. You will work on projects related to conservation, pollution control, and sustainability.',
                'As an ecologist, you will research ecosystems and wildlife interactions. You will work on conservation efforts and environmental impact assessments.',
            ],
            'Game Development' => [
                'As a game developer, you will design and create video games. You will work on game mechanics, graphics, and programming to deliver engaging gameplay experiences.',
                'As a game designer, you will develop game concepts, storylines, and gameplay elements. You will work with developers and artists to bring your vision to life.',
            ],
        ];

        $jobIconMap = [
            'Software Development' => [
                'http://localhost:8000/files/jobs/seeder/software/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/software/th.jpeg', 
                'http://localhost:8000/files/jobs/seeder/software/unduhan.jpeg', 
                'http://localhost:8000/files/jobs/seeder/software/softwaredev.jpeg', ],
            'Data Science' => [
                'http://localhost:8000/files/jobs/seeder/data/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/data/OIP2.jpeg', 
                'http://localhost:8000/files/jobs/seeder/data/th3.jpeg', ],
            'Cyber Security' => [
                'http://localhost:8000/files/jobs/seeder/cyber/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/cyber/OIP2.jpeg', 
                'http://localhost:8000/files/jobs/seeder/cyber/unduhan.jpeg', 
                'http://localhost:8000/files/jobs/seeder/cyber/unduhan2.jpeg', ],
            'Healthcare Management' => [
                'http://localhost:8000/files/jobs/seeder/health/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/health/OIP2.jpeg', ],
            'Nursing' => [
                'http://localhost:8000/files/jobs/seeder/nursing/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/nursing/OIP2.jpeg', 
                'http://localhost:8000/files/jobs/seeder/nursing/unduhan1.jpeg', 
                'http://localhost:8000/files/jobs/seeder/nursing/unduhan2.jpeg', ],
            'Accounting' => [
                'http://localhost:8000/files/jobs/seeder/accounting/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/accounting/unduhan.jpeg', 
                'http://localhost:8000/files/jobs/seeder/accounting/unduhan1.jpeg', 
                'http://localhost:8000/files/jobs/seeder/accounting/unduhan2.jpeg', 
                'http://localhost:8000/files/jobs/seeder/accounting/unduhan3.jpeg', ],
            'Financial Analysis' => [
                'http://localhost:8000/files/jobs/seeder/finance/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/finance/unduhan.jpeg', 
                'http://localhost:8000/files/jobs/seeder/finance/unduhan1.jpeg', 
                'http://localhost:8000/files/jobs/seeder/finance/unduhan2.jpeg', 
                'http://localhost:8000/files/jobs/seeder/finance/unduhan3.jpeg', ],
            'Marketing' => [
                'http://localhost:8000/files/jobs/seeder/marketing/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/marketing/OIP2.jpeg', 
                'http://localhost:8000/files/jobs/seeder/marketing/OIP3.jpeg', 
                'http://localhost:8000/files/jobs/seeder/marketing/unduhan.jpeg', 
                'http://localhost:8000/files/jobs/seeder/marketing/unduhan5.jpeg', ],
            'Sales' => [
                'http://localhost:8000/files/jobs/seeder/sales/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/sales/OIP2.jpeg', 
                'http://localhost:8000/files/jobs/seeder/sales/unduhan.jpeg', 
                'http://localhost:8000/files/jobs/seeder/sales/unduhan1.jpeg', 
                'http://localhost:8000/files/jobs/seeder/sales/unduhan2.jpeg', ],
            'Human Resource' => [
                'http://localhost:8000/files/jobs/seeder/human/humanres1.jpg', 
                'http://localhost:8000/files/jobs/seeder/human/humanres2.png', 
                'http://localhost:8000/files/jobs/seeder/human/humanres3.jpeg', 
                'http://localhost:8000/files/jobs/seeder/human/humanres4.jpeg', ],
            'Civil Engineering' => [
                'http://localhost:8000/files/jobs/seeder/civil/civi.jpeg', 
                'http://localhost:8000/files/jobs/seeder/civil/civileng.jpeg',
                'http://localhost:8000/files/jobs/seeder/civil/enginering.jpeg', ],
            'Electrical Engineering' => [
                'http://localhost:8000/files/jobs/seeder/electro/elek.jpeg', 
                'http://localhost:8000/files/jobs/seeder/electro/elet.jpeg', 
                'http://localhost:8000/files/jobs/seeder/electro/lek.jpeg', ],
            'Mechanical Engineering' => [
                'http://localhost:8000/files/jobs/seeder/mechanic/mechanical.jpeg', 
                'http://localhost:8000/files/jobs/seeder/mechanic/mek.jpeg', 
                'http://localhost:8000/files/jobs/seeder/mechanic/mekanik.jpeg', 
                'http://localhost:8000/files/jobs/seeder/mechanic/mekanikal.jpeg', ],
            'Architecture' => [
                'http://localhost:8000/files/jobs/seeder/architecture/arc.jpeg', 
                'http://localhost:8000/files/jobs/seeder/architecture/archi.jpeg', 
                'http://localhost:8000/files/jobs/seeder/architecture/architctur.jpeg', 
                'http://localhost:8000/files/jobs/seeder/architecture/architectu.jpeg', ],
            'Customer Service' => [
                'http://localhost:8000/files/jobs/seeder/customer/cust.jpeg', 
                'http://localhost:8000/files/jobs/seeder/customer/customerservice.jpeg', 
                'http://localhost:8000/files/jobs/seeder/customer/customersr.jpeg', 
                'http://localhost:8000/files/jobs/seeder/customer/serv.jpeg', ],
            'Supply Chain Management' => [
                'http://localhost:8000/files/jobs/seeder/supply/chin.jpeg', 
                'http://localhost:8000/files/jobs/seeder/supply/management.jpeg', 
                'http://localhost:8000/files/jobs/seeder/supply/sup.jpeg', 
                'http://localhost:8000/files/jobs/seeder/supply/supply.jpeg', ],
            'Education and Teaching' => [
                'http://localhost:8000/files/jobs/seeder/education/edu.jpeg', 
                'http://localhost:8000/files/jobs/seeder/education/education.jpeg', 
                'http://localhost:8000/files/jobs/seeder/education/educt.jpeg', 
                'http://localhost:8000/files/jobs/seeder/education/tec.jpeg', ],
            'Project Management' => [
                'http://localhost:8000/files/jobs/seeder/project/m.jpeg', 
                'http://localhost:8000/files/jobs/seeder/project/manag.jpeg', 
                'http://localhost:8000/files/jobs/seeder/project/proj.jpeg', 
                'http://localhost:8000/files/jobs/seeder/project/projectman.jpeg', ],
            'Business Analysis' => [
                'http://localhost:8000/files/jobs/seeder/business/an.jpeg', 
                'http://localhost:8000/files/jobs/seeder/business/busi.jpeg', 
                'http://localhost:8000/files/jobs/seeder/business/bussine.jpeg', 
                'http://localhost:8000/files/jobs/seeder/business/bussines.jpeg', ],
            'Network Administration' => [
                'http://localhost:8000/files/jobs/seeder/network/OIP.jpeg', 
                'http://localhost:8000/files/jobs/seeder/network/OIP1.jpeg', 
                'http://localhost:8000/files/jobs/seeder/network/OIP3.jpeg', 
                'http://localhost:8000/files/jobs/seeder/network/OIP4.jpeg',
                'http://localhost:8000/files/jobs/seeder/network/unduhan.jpeg', ],
        ];
        
        
        // return [
        //     'title'=>fake()->sentence(3, false),
        //     'slug'=>fake()->unique()->slug(),
        //     'salary'=>fake()->numberBetween(30000, 45000),
        //     'expire_at'=>fake()->dateTimeBetween('+1 month', '+2 month'),
        //     'cat_id'=>fake()->randomElement(Category::where('status', 'active')->pluck('id')->toArray()),
        //     'company_id'=>fake()->randomElement(Company::where('id', 1)->pluck('id')->toArray()),
        //     'icon'=>fake()->randomElement(['http://localhost:8000/files/jobs/default.png', 'http://localhost:8000/files/jobs/default1.png', 'http://localhost:8000/files/jobs/default2.png', 'http://localhost:8000/files/jobs/default3.png']),
        //     'description'=>fake()->sentence(300),
        //     'status'=>fake()->randomElement(['active', 'inactive']),
        //     'type'=>fake()->randomElement(['full time', 'part time']),
        //     'is_featured'=>fake()->randomElement([true, false]),
        //     'created_at'=>now(),
        //     'updated_at'=>now()
        // ];

        // $category = fake()->randomElement(Category::where('status', 'active')->pluck('id')->toArray());

        // fake()->randomElement(['http://localhost:8000/files/jobs/default.png', 'http://localhost:8000/files/jobs/default1.png', 'http://localhost:8000/files/jobs/default2.png', 'http://localhost:8000/files/jobs/default3.png'])
        $category = fake()->randomElement(Category::where('status', 'active')->get());
        $title = fake()->randomElement($jobCategoryMap[$category->name]);

        return [
            'cat_id'=>$category->id,
            'icon'=>fake()->randomElement($jobIconMap[$category->name]),
            'salary'=>fake()->numberBetween(3000000, 50000000),
            'expire_at'=>fake()->dateTimeBetween('+1 month', '+2 month'),
            'company_id'=>fake()->randomElement(Company::where('id', fake()->numberBetween(1, 3))->pluck('id')->toArray()),
            'slug'=>fake()->unique()->slug(),
            'type'=>fake()->randomElement(['full time', 'part time']),
            'status'=>fake()->randomElement(['active', 'inactive']),
            'is_featured'=>fake()->randomElement([true, false]),
            'title'=>$title,
            // 'title'=>fake()->sentence(3, false),
            // 'description'=>fake()->sentence(300),
            'description'=>fake()->randomElement($jobDescriptionMap[$category->name]).' and you will collaborate with us to achieve great results. '."\n\n".'Key abilities include: '."\n".'1. Good Communication Skills'."\n".'2. Responsible and Hardworker'."\n".'3. Want to growth'."\n\n".'We welcome you to apply to this job and do stuff with our company',
            'created_at'=>now(),
            'updated_at'=>now()
        ];
    }
}
