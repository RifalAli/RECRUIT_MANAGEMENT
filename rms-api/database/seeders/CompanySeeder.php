<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            'name'=>'PT. Indah Group',
            'slug'=>Str::slug(Str::random(20)),
            'location'=>'Sidoarjo, Jawa Timur',
            'description'=>"At PT. Indah Group, we are dedicated to delivering exceptional products and services that exceed our clients' expectations. Founded in 1997, our mission is to innovate and lead in the industry, providing cutting-edge solutions tailored to meet the diverse needs of our customers. \n\nOur team of experienced professionals is committed to excellence and driven by a passion for success. We pride ourselves on our ability to adapt to the ever-changing market landscape, utilizing advanced technology and strategic insights to offer reliable and effective solutions.\n\nWith a strong focus on customer satisfaction, we build lasting relationships through integrity, quality, and personalized service. At our company, we believe in fostering a collaborative and dynamic work environment that encourages growth and development.\n\nWe invite you to explore our range of services and see how we can partner with you to achieve your goals. Together, let's drive innovation and create lasting impact for peoples.",
            'user_id'=>2,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        DB::table('companies')->insert([
            'name'=>'PT. Eka Lestari',
            'slug'=>Str::slug(Str::random(20)),
            'location'=>'Sidoarjo, Jawa Timur',
            'description'=>"At PT. Eka Lestari, we are dedicated to delivering exceptional products and services that exceed our clients' expectations. Founded in 1987, our mission is to innovate and lead in the industry, providing cutting-edge solutions tailored to meet the diverse needs of our customers. \n\nOur team of experienced professionals is committed to excellence and driven by a passion for success. We pride ourselves on our ability to adapt to the ever-changing market landscape, utilizing advanced technology and strategic insights to offer reliable and effective solutions.\n\nWith a strong focus on customer satisfaction, we build lasting relationships through integrity, quality, and personalized service. At our company, we believe in fostering a collaborative and dynamic work environment that encourages growth and development.\n\nWe invite you to explore our range of services and see how we can partner with you to achieve your goals. Together, let's drive innovation and create lasting impact for peoples.",
            'user_id'=>4,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        DB::table('companies')->insert([
            'name'=>'PT. Sinar Mas',
            'slug'=>Str::slug(Str::random(20)),
            'location'=>'Sidoarjo, Jawa Timur',
            'description'=>"At PT. Sinar Mas, we are dedicated to delivering exceptional products and services that exceed our clients' expectations. Founded in 1950, our mission is to innovate and lead in the industry, providing cutting-edge solutions tailored to meet the diverse needs of our customers. \n\nOur team of experienced professionals is committed to excellence and driven by a passion for success. We pride ourselves on our ability to adapt to the ever-changing market landscape, utilizing advanced technology and strategic insights to offer reliable and effective solutions.\n\nWith a strong focus on customer satisfaction, we build lasting relationships through integrity, quality, and personalized service. At our company, we believe in fostering a collaborative and dynamic work environment that encourages growth and development.\n\nWe invite you to explore our range of services and see how we can partner with you to achieve your goals. Together, let's drive innovation and create lasting impact for peoples.",
            'user_id'=>5,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);

        // \App\Models\Company::factory(5)->create();
    }
}
