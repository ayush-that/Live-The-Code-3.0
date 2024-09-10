import React from 'react';
import Image from 'next/image';
import { ContainerScroll } from '../../components/ui/container-scroll-animation';

function Hero() {
  return (
    <section className="flex flex-col items-center bg-gray-50">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Manage your Money with AI-Driven Personal <br />
                <span className="mt-1 text-4xl font-bold leading-none text-blue-800 md:text-[6rem]">
                  Finance Advisor
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/dashboard.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
}

export default Hero;
