import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";

import { useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
// import * as Select from "@radix-ui/react-select";

interface Game {
  id: string;
  title: string;
}
export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);
  console.log(weekDays);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content
          className="fixed bg-[#2A2634] py-8 px-10 text-white 
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]
      shadow-lg shadow-black/25"
        >
          <Dialog.Title className="text-3xl font-balck text-white">
            Publique um anúncio
          </Dialog.Title>

          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <select
                id="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placelhold:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option disabled selected value="">
                  Selecione o game que deseja jogar
                </option>
                {games.map((game) => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input id="name" placeholder="Como te chamam dentro do game?" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="y">Joga há quantos anos?</label>
                <Input type="name" placeholder="Tudo bem ser ZERO" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input id="discord" type="type" placeholder="Usuario#0000" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-7 gap-1"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    title="Domingo"
                    value="0"
                    className={`w-7 h-11 rounded  ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Segunda"
                    value="1"
                    className={`w-7 h-11 rounded  ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Terça"
                    value="2"
                    className={`w-7 h-11 rounded  ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Quarta"
                    value="3"
                    className={`w-7 h-11 rounded  ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Quinta"
                    value="4"
                    className={`w-7 h-11 rounded  ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Sexta"
                    value="5"
                    className={`w-7 h-11 rounded  ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    title="Sábado"
                    value="6"
                    className={`w-7 h-11 rounded  ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hoursStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-1 h-11">
                  <Input
                    id="hourStart"
                    type="time"
                    placeholder="De"
                    className="appearance-none"
                  />
                  <Input
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                    className="appearance-none"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>
            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 hover:bg-zinc-600 
              px-5 h-12 rounded-md font-semibold "
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-600
              px-5 h-12 rounded-md font-semibold flex items-center gap-3
                "
              >
                <GameController className="h-6 w-6" />
                Encontre seu duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
