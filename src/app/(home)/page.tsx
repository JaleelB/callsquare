import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge, badgeVariants } from "~/components/ui/badge";
import { Icons } from "~/components/ui/icons";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site-config";

type Tool = {
  name: string;
  icon: React.ReactNode;
};

type Features = {
  description: string;
} & Tool;

const tools: Tool[] = [
  {
    name: "Next.js 13",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 fill-current">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
      </svg>
    ),
  },
  {
    name: "React 18",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 fill-current">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
    ),
  },
  {
    name: "Next Auth",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="h-9 w-9 fill-current"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Radix UI",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="4 0 17 25"
        className="h-9 w-9 fill-current"
      >
        <path d="M12 25a8 8 0 1 1 0-16v16zM12 0H4v8h8V0zM17 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
    ),
  },
  {
    name: "Prisma",
    icon: (
      <svg
        viewBox="0.34 -0.059977834648891726 33.11668247084116 39.96397783464889"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 fill-current"
      >
        <path
          d="M32.908 30.475L19.151 1.26a2.208 2.208 0 0 0-1.88-1.257 2.183 2.183 0 0 0-2.01 1.042L.34 25.212a2.26 2.26 0 0 0 .025 2.426L7.66 38.935a2.346 2.346 0 0 0 2.635.969l21.17-6.262a2.32 2.32 0 0 0 1.457-1.258 2.27 2.27 0 0 0-.013-1.91zm-3.08 1.253L11.864 37.04c-.548.163-1.074-.312-.96-.865l6.418-30.731c.12-.575.914-.666 1.165-.134l11.881 25.23a.858.858 0 0 1-.541 1.188z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    ),
  },
];

const features: Features[] = [
  {
    name: "Partcipent Invites",
    description:
      "Invite participants to your meeting via an invite link or an invite email.",
    icon: (
      <svg
        viewBox="0 0 19 16"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current"
      >
        <path
          d="M17.8337 3C17.8337 2.08333 17.0837 1.33333 16.167 1.33333H2.83366C1.91699 1.33333 1.16699 2.08333 1.16699 3M17.8337 3V13C17.8337 13.9167 17.0837 14.6667 16.167 14.6667H2.83366C1.91699 14.6667 1.16699 13.9167 1.16699 13V3M17.8337 3L9.50033 8.83333L1.16699 3"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Screen Sharing",
    description: "Share your screen with other participants in your call.",
    icon: (
      <svg
        viewBox="0 0 19 16"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current"
      >
        <path
          d="M16.167 1.33333H2.83366C1.91699 1.33333 1.16699 2.08333 1.16699 3V13C1.16699 13.9167 1.91699 14.6667 2.83366 14.6667H16.167C17.0837 14.6667 17.8337 13.9167 17.8337 13V3C17.8337 2.08333 17.0837 1.33333 16.167 1.33333Z"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.50033 8.83333L1.16699 3"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Accessing call history",
    description:
      "Keep track of your past interactions with the call history feature.",
    icon: (
      <svg
        viewBox="0 0 19 16"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current"
      >
        <path
          d="M16.167 1.33333H2.83366C1.91699 1.33333 1.16699 2.08333 1.16699 3V13C1.16699 13.9167 1.91699 14.6667 2.83366 14.6667H16.167C17.0837 14.6667 17.8337 13.9167 17.8337 13V3C17.8337 2.08333 17.0837 1.33333 16.167 1.33333Z"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.50033 8.83333L1.16699 3"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function IndexPage() {
  return (
    <>
      <section className="container mx-auto max-w-[1400px] py-16 lg:py-24">
        <div className="flex flex-col items-center gap-16 text-center">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-8">
            <Link
              href={siteConfig.links.github}
              className={`${badgeVariants({ variant: "secondary" })} w-fit`}
              target="_blank"
              rel="noreferrer"
            >
              Find the project on Github
              <Icons.chevronRight className="ml-1 h-4 w-4" />
            </Link>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              Video calls made possible with Next.js 13
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {siteConfig.description}
            </p>
            <Link href="/register">
              <Button size="lg" className="py-6 font-normal">
                Try Callsquare
              </Button>
            </Link>
          </div>
          <Image
            src="/hero-image.png"
            width={1200}
            height={800}
            alt="Hero Image"
          />
        </div>
      </section>

      <section className="container mx-auto max-w-[1400px] pb-12 md:pb-16 lg:pb-24">
        <div className="flex w-full flex-col items-center gap-8 text-center">
          <div className="text-center">
            <p className="text-base text-muted-foreground sm:text-lg">
              This project was built using the following technologies
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-4xl flex-wrap place-items-center items-center justify-center gap-6 sm:gap-12">
            {tools.map((tool, index) => (
              <div key={index} className="flex items-center space-x-2">
                {tool.icon}
                <h3 className="hidden text-2xl font-medium sm:block">
                  {tool.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-[1400px] py-12  md:py-16 lg:py-24">
        <div className="flex w-full flex-col items-center gap-16 text-center">
          <div className="flex flex-col items-center gap-5 text-center">
            <Badge variant="secondary">Features</Badge>
            <div>
              <h2 className="mb-4 text-2xl font-semibold sm:text-4xl">
                Features for Enhanced Communication
              </h2>
              <p className="max-w-[800px] text-base text-muted-foreground sm:text-lg">
                This project offers a range of features designed to facilitate
                smooth and efficient communication. From high-definition video
                calls to screen sharing and call history,
              </p>
            </div>
          </div>
          <div className="w-full">
            <Image
              src="/features-image.png"
              width={1200}
              height={800}
              alt="Hero Image"
              className="mx-auto"
            />
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 place-items-center gap-8 sm:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-5 space-x-2"
                >
                  {feature.icon}
                  <div>
                    <h3 className="mb-2 text-xl font-medium">{feature.name}</h3>
                    <p className="max-w-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-[1400px] px-4 py-12 md:p-16 lg:p-24">
        <div className="flex w-full max-w-7xl flex-col items-center gap-4 px-5 py-8 text-center sm:p-12">
          <div>
            <h2 className="md:text mx-auto mb-4 max-w-[300px] text-[30px] font-semibold leading-9 sm:max-w-none sm:text-4xl">
              This is an open source project
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Callsquare is open source. Check out the GitHub repository to get
              started.
            </p>
          </div>

          <Link
            href="https://github.com/JaleelB/callsquare"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" className="py-4 text-sm font-normal">
              <Icons.github color="#fff" className="mr-2 h-4 w-4" />
              Github repo
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
