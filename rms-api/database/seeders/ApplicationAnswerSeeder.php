<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ApplicationAnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ApplicationAnswerMap = [
            'accepted' => [
                'Answer1' => [
                    'title' => 'Congratulations!',
                    'msg' => 'Dear Candidate, we are pleased to inform you that your application has been accepted. We appreciate your interest in our company. Your interview is scheduled for September 20, 2024, at 10:00 AM. Please join the interview using the following link: https://example.com/interview. We look forward to speaking with you. Best regards.'
                ],
                'Answer2' => [
                    'title' => 'Welcome Aboard!',
                    'msg' => 'Hello, congratulations on your successful application! We are excited to invite you for an interview on September 21, 2024, at 2:00 PM. Please use the link provided: https://example.com/interview. Thank you for your enthusiasm, and we can’t wait to meet you. Kind regards.'
                ],
                'Answer3' => [
                    'title' => 'Exciting News!',
                    'msg' => 'Dear Applicant, your application has been accepted. We are impressed with your qualifications. The interview will take place on September 22, 2024, at 11:00 AM. Access the interview through this link: https://example.com/interview. We are eager to discuss your application. Best wishes.'
                ],
                'Answer4' => [
                    'title' => 'Offer of Interview',
                    'msg' => 'Congratulations! Your application has been successful. We would like to invite you for an interview on September 23, 2024, at 9:00 AM. Use the link to join: https://example.com/interview. We appreciate your application and look forward to your response. Regards.'
                ],
                'Answer5' => [
                    'title' => 'Great News!',
                    'msg' => 'Hi there, we are happy to inform you that your application is accepted. Please attend the interview on September 24, 2024, at 3:00 PM. The interview link is: https://example.com/interview. We appreciate your interest and hope to see you soon. Sincerely.'
                ],
                'Answer6' => [
                    'title' => 'Interview Invitation',
                    'msg' => 'Dear Applicant, we are pleased to offer you an interview. The scheduled time is September 25, 2024, at 1:00 PM. Join the interview via: https://example.com/interview. We value your application and look forward to our conversation. Thank you.'
                ],
                'Answer7' => [
                    'title' => 'Successful Application',
                    'msg' => 'Congratulations! Your application has been accepted. We would like to schedule your interview for September 26, 2024, at 4:00 PM. Please use the following link: https://example.com/interview. We appreciate your time and effort. See you soon.'
                ],
                'Answer8' => [
                    'title' => 'Invitation to Interview',
                    'msg' => 'Hello, we are pleased to let you know that your application has been accepted. Your interview is set for September 27, 2024, at 12:00 PM. Click here to join: https://example.com/interview. Thank you for your interest, and we look forward to meeting you.'
                ],
                'Answer9' => [
                    'title' => 'Interview Scheduled',
                    'msg' => 'Dear Candidate, we are excited to inform you that your application has been accepted. Your interview will be held on September 28, 2024, at 10:30 AM. Use the link to join: https://example.com/interview. We appreciate your enthusiasm and look forward to the discussion.'
                ],
                'Answer10' => [
                    'title' => 'Congratulations and Interview Details',
                    'msg' => 'Congratulations on being accepted! We have scheduled your interview for September 29, 2024, at 2:30 PM. Please attend via this link: https://example.com/interview. We appreciate your application and are eager to speak with you. Best regards.'
                ]
            ],
            'rejected' => [
                'Answer1' => [
                    'title' => 'Application Status',
                    'msg' => 'Dear Candidate, thank you for your interest in our company. Unfortunately, we will not be moving forward with your application at this time. We appreciate the effort you put into your application. We wish you all the best in your job search.'
                ],
                'Answer2' => [
                    'title' => 'Update on Your Application',
                    'msg' => 'Hello, we regret to inform you that your application was not successful. We appreciate your interest and time invested. Thank you for considering us, and we wish you success in your future endeavors.'
                ],
                'Answer3' => [
                    'title' => 'Application Update',
                    'msg' => 'Dear Applicant, after careful consideration, we have decided not to move forward with your application. We appreciate your effort and interest. Thank you and best of luck with your job search.'
                ],
                'Answer4' => [
                    'title' => 'Status Update',
                    'msg' => 'Dear Applicant, we have reviewed your application and, unfortunately, we are unable to offer you a position at this time. Thank you for your interest and effort. We wish you the best of luck in your future applications.'
                ],
                'Answer5' => [
                    'title' => 'Decision on Your Application',
                    'msg' => 'Hi there, thank you for your application. We regret to inform you that we will not be progressing with your application. We appreciate your interest and wish you success in finding a suitable role.'
                ],
                'Answer6' => [
                    'title' => 'Application Outcome',
                    'msg' => 'Dear Candidate, after reviewing your application, we have decided not to proceed with it. We appreciate the time you took to apply and wish you all the best in your future career endeavors.'
                ],
                'Answer7' => [
                    'title' => 'Notice Regarding Your Application',
                    'msg' => 'Hello, thank you for applying to our company. Unfortunately, we will not be moving forward with your application. We appreciate your time and interest and wish you success in your job search.'
                ],
                'Answer8' => [
                    'title' => 'Application Review Complete',
                    'msg' => 'Dear Applicant, we have completed our review of your application. Regrettably, we will not be proceeding with your application. Thank you for your interest, and we wish you the best in your job search.'
                ],
                'Answer9' => [
                    'title' => 'Update on Application Status',
                    'msg' => 'Hi, we regret to inform you that your application has not been successful. Thank you for considering a position with us. We appreciate your time and wish you all the best in your future job searches.'
                ],
                'Answer10' => [
                    'title' => 'Final Decision',
                    'msg' => 'Dear Candidate, thank you for your interest in our company. We have decided not to proceed with your application at this time. We appreciate your effort and wish you success in your future endeavors.'
                ]
            ]
        ];
        
        $jobApplications = JobApplication::whereNot([['status', 'pending']])->get();

        foreach ($jobApplications as $jobApplication) {
            $number = random_int(1, 10);
            $title = $ApplicationAnswerMap[$jobApplication->status]['Answer'.$number]['title'];
            $message = $ApplicationAnswerMap[$jobApplication->status]['Answer'.$number]['msg'];

            \App\Models\ApplicationAnswer::factory(1)->create([
                'title' => $title,
                'message' => $message,
                'application_id' => $jobApplication->id,
            ]);
        }

        // DB::table('application_answers')->insert([
        //     'title'=>'Hello',
        //     'message'=>'Test Message',
        //     'application_id'=>1,
        //     'created_at'=>now(),
        //     'updated_at'=>now()
        // ]);

        // \App\Models\ApplicationAnswer::factory(5)->create();
    }
}
