import { Fragment, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  SunIcon,
  UserIcon,
  ArrowUpOnSquareIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const bottomNavOptions = [
  { name: "Clear Conversations", icon: TrashIcon },
  { name: "Dark Mode", icon: SunIcon },
  { name: "My Account", icon: UserIcon },
  { name: "Updates & FAQ", icon: ArrowUpOnSquareIcon },
  { name: "Log out", icon: ArrowRightOnRectangleIcon },
];

const navigation = [
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: true,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
  {
    name: "Sample Convo",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
    current: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [bioEntered, setBioEntered] = useState<string[]>([]);
  const [vibe, setVibe] = useState("Professional");
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);

  const [introTitle, setIntroTitle] = useState(true);

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt =
    "you are to act as ChatGPT-3, a chatbot that is trained on the internet. You are to respond to the following prompt: \"Hi, I'm ChatGPT-3, a chatbot that is trained on the internet. I'm here to answer any questions you have about the internet. What would you like to know?\"" +
    bio;

  const generateBio = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setIntroTitle(false);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // @ts-ignore
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let bio = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      bio += decoder.decode(value);
    }

    setGeneratedBios((prevBios) => [...prevBios, bio]);
    setLoading(false);
    scrollToBios();
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-neutral-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-800 text-white"
                              : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                            "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                          )}
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            Tom Cook
                          </p>
                          <p className="text-sm font-medium text-indigo-200 group-hover:text-white">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-neutral-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-2 pb-2">
              <div className="flex flex-shrink-0 items-center px-2">
                <div className="w-full">
                  <Button className="w-full" variant="outline" size="lg">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    New Chat
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-full rounded-md">
                <nav className="mt-5 flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Button variant="ghost" size="lg" className="">
                      <item.icon
                        className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Button>
                  ))}
                </nav>
              </ScrollArea>
            </div>
            {/* TOM COOK */}
            <Separator />
            {bottomNavOptions.map((option) => (
              //   <div className="flex flex-shrink-0  p-2">
              //     <a href="#" className="group block w-full flex-shrink-0">
              //       <div className="flex items-center">
              //         <div>
              //           <option.icon className="inline-block h-9 w-9" />
              //         </div>

              //         <div className="ml-3">
              //           <p className="text-sm font-medium text-white">
              //             {option.name}
              //           </p>
              //         </div>
              //       </div>
              //     </a>
              //   </div>
              <div className="flex flex-shrink-0 ">
                <Button className="w-full" variant="ghost" size="lg">
                  <option.icon className="w-5 h-5 mr-2" />
                  {option.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* MAIN CONTENT */}
          <div>
            {generatedBios && (
              <>
                <div>
                  <h2
                    className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                    ref={bioRef}
                  ></h2>
                </div>
                {generatedBios.map((generatedBio, index) => (
                  <div key={index} className="space-y-8 flex flex-col p-2">
                    <div className="text-gray-400">
                      {/* the bioEntered index */}
                    </div>
                    <div
                      className="bg-white rounded-xl p-4 hover:bg-gray-100 transition cursor-copy border"
                      onClick={() => {
                        // @ts-ignore
                        navigator.clipboard.writeText(generatedBio);
                      }}
                    >
                      <p>{generatedBio}</p>
                      <br />
                    </div>
                  </div>
                ))}
              </>
            )}

            {introTitle && (
              <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl text-gray-300 font-bold">
                  AbdoGPT&nbsp;
                </h1>
                <span className="inline-flex items-center rounded-md bg-yellow-200 px-2.5 py-0.5 text-sm font-medium text-yellow-800">
                  PLUS
                </span>
              </div>
            )}

            {/* place at bottom of page */}
            <div className="absolute bottom-0  p-4 w-3/4">
              <Input
                onChange={(e) => {
                  setBio(e.target.value);
                  // @ts-ignore
                  setBioEntered(e.target.value);
                }}
                // if user presses enter, generate a new bio
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    generateBio(e);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
