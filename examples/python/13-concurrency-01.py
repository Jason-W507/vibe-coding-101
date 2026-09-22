import asyncio

async def wait_for_label(label):
    await asyncio.sleep(0.1)
    return label

async def main():
    first = asyncio.create_task(wait_for_label("第一项"))
    second = asyncio.create_task(wait_for_label("第二项"))
    print(await first, await second)

asyncio.run(main())
